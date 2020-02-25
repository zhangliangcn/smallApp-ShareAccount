<?php
namespace app\product\controller;

use think\Request;
use app\product\model\orderlist;
use app\product\model\orderbill;
use app\index\model\Productlist;
use think\Db;

class Index
{
	
	public function submitorder(){	
            $request = Request::instance();
            $ceateUser = $request->post("createUser");
            $userAvatarUrl = $request->post("userAvatarUrl");
            $pName = $request->post("pName");
            $pType = $request->post("pType");
            $nickname = $request->post("nickName");
            $pImgUrl = $request->post("pImgUrl");
            $titleStatus = $request->post("titleStatus");
            $btnStatus = $request->post("btnStatus");
            $pPrice = $request->post("pPrice");
            $selfKan = $this->randomFloat(1.3, 2.8);
            $endTime =$request->post("pEndTime");
            $pPrice -= $selfKan;
            if($this->isHaveOrderByUserIDandType($pType, $ceateUser)){
                return ['err'=>'101',"desc"=>'该类型订单已存在'];                                
            }else{
                $orderData = ["create_user"=>$ceateUser,"endtime"=>$endTime,"user_avatarUrl"=>$userAvatarUrl,"p_name"=>$pName,"p_type"=>$pType,"p_imgUrl"=>$pImgUrl,'p_amount'=>$pPrice,'title_status'=>$titleStatus,'btn_status'=>$btnStatus];
                $order = new orderlist();
                $order->data($orderData);
                $order->save();
                $_orderID = $order->ID;
                $this->addRecord($_orderID,$ceateUser,$nickname,$userAvatarUrl,$selfKan);
                
                return ["err"=>"ok","desc"=> ["orderID"=>$_orderID,'selfPrice'=>$selfKan]];
                
            }
	}
    
/*      +---------------------------------------------+
 *      } Desc    | 将砍价记录添加到日志表中
 *      +---------------------------------------------+
 *      |Params   | ①订单ID；②用户openid
 *      +---------------------------------------------+
 *      |Return   | 根于砍价剩余金额是否为0 来判断订单是否完成,TRUE有为完成的订单，FALSE该类型订单已经完成
 *      +---------------------------------------------+ 
 */  
        public function  addRecord($orderID,$openid,$nickname,$avatarUrl,$amount)
        {
            if($amount>1){
                $flag="新手出刀，刀刀入肉！";
            }else{
                $flag="抱歉，刀砍歪了";
            }
            
            
            $Record = new orderbill();
            $Record->data(['order_ID'=>$orderID,'openid'=>$openid,'nickName'=>$nickname,'flag'=>$flag,'avatarUrl'=>$avatarUrl,'amount'=>$amount]);
            $Record->save();
        }




        /*      +---------------------------------------------+
 *      } Desc    | 根据订单类型判断当前是否you正在进行的订单
 *      +---------------------------------------------+
 *      |Params   | ①订单的类型；②用户openid
 *      +---------------------------------------------+
 *      |Return   | 根于砍价剩余金额是否为0 来判断订单是否完成,TRUE有为完成的订单，FALSE该类型订单已经完成
 *      +---------------------------------------------+ 
 */    
        
        public function isHaveOrderByUserIDandType($pType,$openid)
        {
           $orderObj = Db::table('orderlist')->where('p_type',$pType)->where('create_user',$openid)->where('p_amount','>',0)->value('p_amount');
          if($orderObj){

              return TRUE;
          }else{

              return FALSE;
          }
        }
         
        
/*      +---------------------------------------------+
 *      } Desc    | 判断用户是否是第一次砍价。内部调用具有优先权
 *      +---------------------------------------------+
 *      |@openid  | 用户识别ID
 *      +---------------------------------------------+
 *      |@openid  | 用户识别ID
 *      +---------------------------------------------+ 
 */
        public function isNewCustomer($params = ""){
            if($params === ""){
                $request = Request::instance();
                $openid = $request->post('openid');
                  if($openid === NULL){
                    return -1;
                }
            } else {
                $openid = $params;  
            }

            $count = orderbill::where('openid',$openid)->count();
            if($count){
                return FALSE; 
            }else{
                return TRUE; 
            }
    }
    

/*      +---------------------------------------------+
 *      } Desc        | 通过商品的ID获取商品的价格
 *      +---------------------------------------------+
 *      |@product_id  | 商品的价格
 *      +---------------------------------------------+
 *      |Return       | 返回该ID商品的价格
 *      +---------------------------------------------+
 */
    public function getPriceById($params = 0){
      
         if($params === 0){
                $request = Request::instance();
                $product_id  = $request->post('productId');
                if($product_id === NULL){
                    return -1;
                }
            } else {
                 $product_id = $params;  
            }
            $price = Productlist::get(function($query)use($product_id){
                $query->where('Id',$product_id);            
            });
            echo $price->p_price;
 
    }
    
    
    
/*      +---------------------------------------------+
 *      } Desc    | 根据用户是否是新用户 或老用户 产生随机金额
 *      +---------------------------------------------+
 *      |@params  | 用户ID
 *      +---------------------------------------------+
 * 
 */
    public  function  getLessAmountById($openid)
    {
        if($this->isNewCustomer($openid)){
            return $this->randomFloat(0.9, 2.0);
        }else{
            return $this->randomFloat(0.03, 0.1);
        }
    }

/*      +---------------------------------------------+
 *      } Desc    | 产生带指定范围内的随机金额数，精确到分
 *      +---------------------------------------------+
 *      |@params  |1.$min :范围起点  2.$max 范围终点
 *      +---------------------------------------------+
 *      |Return   |返回指定区间的FLOAT 数据
 *      +---------------------------------------------+
 * 
 */

    function randomFloat($min = 0, $max = 10)
    {
        $num = $min + mt_rand() / mt_getrandmax() * ($max - $min);
        return sprintf("%.2f", $num);
     
    }

/*  
 *     +--------------------------------------------------------------+
 *      } Desc    | 通过产品ID与用户ID判断用户是否同一订单已经砍过价
 *      +---------------------------------------------------------------+
 *      |@params  |1.$min :范围起点  2.$max 范围终点
 *      +----------------------------------------------------------------+
 *      |return   |返回True为该订单已经砍价过；返回FALSE为该订单未砍价
 *      +----------------------------------------------------------------+
 */   
    
    public function isActionByProductIDandUserId($orderId,$openid)
    {
       $count = Db::table('orderbill')->where('order_ID',$orderId)->where('openid',$openid)->count();
       if($count){
           return TRUE;
       }else{
           return FALSE;
       }
                
    }
/*  
 *     +--------------------------------------------------------------+
 *      } Desc    | 根据orderID查询订单目前详情
 *      +---------------------------------------------------------------+
 *      |@params  |1.$order
 *      +----------------------------------------------------------------+
 *      |return   |返回当前订单的想抢
 *      +----------------------------------------------------------------+
 */   
    public function currentOrder($orderID)
    {
         $request = Request::instance();
        $orderID = $request->post("orderID");
        
        $order = orderlist::get(function($query)use($orderID){
            $query->where(['ID'=>$orderID]);
        });
       return ['err'=>100,'desc'=>$order];
  
        
    }








/*  
 *     +--------------------------------------------------------------+
 *      } Desc    | 通过产品类型与用户ID判断用户是否同一订单已经砍过价
 *      +---------------------------------------------------------------+
 *      |@params  |1.$min :范围起点  2.$max 范围终点
 *      +----------------------------------------------------------------+
 *      |return   |返回True为该订单进行中；返回FALSE为开始新单
 *      +----------------------------------------------------------------+
 */   
    
    public function isActionByTypeAndUserId($type,$openid)
    {
        $request = Request::instance();
        $type = $request->post("type");
        $openid = $request->post("openid");
       $count = Db::table('orderlist')->where('p_type',$type)->where('create_user',$openid)->where('p_amount','>',0)->count();
       if($count){
          $order = orderlist::get(function($query)use($type,$openid){
              $query->where('p_type',$type)->where('create_user',$openid);
          });
          
          return ['err'=>"100",'desc'=>['orderID'=>$order->ID]];
       }else{
           return ['err'=>"100",'desc'=>['orderID'=>"0"]];
       }
                
    }

/*  
 *     +--------------------------------------------------------------+
 *      } Desc    | 加载指定订单下面的砍价记录
 *      +---------------------------------------------------------------+
 *      |@params  |1.$ID :订单号
 *      +----------------------------------------------------------------+
 *      |return   |返回当前订单号下面的所有记录
 *      +----------------------------------------------------------------+
 */       
    public function loadLogsRecord($ID = 0)
    {
        $request = Request::instance();
        $ID = $request->post("orderID");
        $Record = orderbill::all(function($query)use($ID){
            $query->where(['order_ID'=>$ID])->order('ID','DESC');
        }); 
        $count = sizeof($Record);
   
        return ['err'=>'ok','orderID'=>$ID,'count'=>$count,'desc'=>$Record];
        
        
        
        
    }

/*      +---------------------------------------------+
 *      } Desc        | 内部测试
 *      +---------------------------------------------+
 *      |@params  | 测试参数
 *      +---------------------------------------------+
 */
    public function test(){
      
        return( $this->currentOrder(67));
    }   









}




