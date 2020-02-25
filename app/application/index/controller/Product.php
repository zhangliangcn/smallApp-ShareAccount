<?php
/**
 * @ desc 产品操作
 * @ Author：azhangliang@gmail.com
 * @create : 2020/02/18
 * 
 */


namespace app\index\controller;

use app\index\model\Productlist;
use app\index\model\Productorder;




class Product
{
    // 获取小程序首页程序列表
    public function getHomeProductList($num = 3){
       $product = Productlist::all(function($query)use($num){
            $query->limit($num)->order('Id','desc');
       });
       $arr_data=[];
       foreach($product as $key=>$user){
            array_push($arr_data,$user);
       }
       return $arr_data;

      
    }
    
    
    public function order($type,$pulisher,$kan){
      //$type 为 xunlei、baidu、aiqiyi、mangguo、qichacha、bilibili等类型
      //$pulisher 当前订单的发布者
      //$kan 已经砍掉的的价格
      //@return 当前订单号
 
    list($msec, $sec) = explode(' ', microtime());
	$orderId = (float)sprintf('%.0f', (floatval($msec) + floatval($sec)) * 1000);
	
	

	
	
	
	
	
	
	// echo($orderId);
	$orderData =new Productorder;
	$orderData->data([
			"orderID"=>$type.$orderId,
			"publisher" => $pulisher,
			"type" => $type,
			"kan" => $kan
		]);
	$orderData->save();
	
	
      
      
      
      
      
      
      
    }
}