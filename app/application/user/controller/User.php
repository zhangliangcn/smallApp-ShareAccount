<?php

namespace app\user\controller;

use app\user\model\usersinfo;
use \think\Request;
use \think\Cache;

class User
{
  
  
  /**
  *	@function auth  微信绑定   
  *@author  azhangliang@gmail.com
  *
  */
  
    public function auth(){
        $request = Request::instance();
		$code=$request->post("code");
		$nickName=$request->post("nickName");
		$gender=$request->post("gender");
		$avatarUrl=$request->post("avatarUrl");
		$province=$request->post("province");
		$country=$request->post("country");
		$city=$request->post("city");
		$slat=rand(1000,9999);
		
		
		
     $url="https://api.weixin.qq.com/sns/jscode2session?appid=wxb610020390e48ee6&secret=0c43e53a12465959692c815f95da4075&js_code=".$code."&grant_type=authorization_code";
	
		$s = file_get_contents($url);
		$s = json_decode($s, true);
		$openid=$s['openid'];
		$session_key=$s['session_key'];
		
		
		$usercount = usersinfo::where('openid',$openid)->count();
		
		
		//refresh_token  加密方式为 md5(slat+openid+time);
		//token   加密方式为 md(slat+session_key+time);
		
		
		
		if($usercount){
			// 更新用户信息
    		$user = new usersinfo;
    		$user->save(['session_key'=>$session_key,'nickName'=>$nickName,'avatarUrl'=>$avatarUrl,'gender'=>$gender,'country'=>$country,'province'=>$province,'city'=>$city],['openid'=>$openid]);
    		// return ['UID'=>$user->UID,'session'=>$session_key];
    		$usercount = usersinfo::get(['openid'=>$openid]);
    		$date = time();
    		$token = md5($date.$session_key);
    		$refresh_token = md5($date.$openid);
    		Cache::set($token,$openid,86400);
    		Cache::set($refresh_token,$openid,172800);
    	
    		
    		
    		return ['token'=>$token,'refresh_token'=>$refresh_token,'isNewCustomer'=>0,'userInfo'=>['nickName'=>$nickName,'avatarUrl'=>$avatarUrl,'openid'=>$openid,'integral'=>$this->getIntegral($openid)]];
    		
    	}else{
    		// 新增用户信息
    		
    		$user = new usersinfo;
    		$user->data(['session_key'=>$session_key,'openid'=>	$openid,'slat'=>$slat,'nickName'=>$nickName,'avatarUrl'=>$avatarUrl,'gender'=>$gender,'country'=>$country,'province'=>$province,'city'=>$city]);
    		$user->save();
    		$date = time();
    		$token = md5($date.$session_key);
    		$refresh_token = md5($date.$openid);
    		Cache::set($token,$openid,86400);
    		Cache::set($refresh_token,$openid,172800);
    		 echo($this->getIntegral($openid));
    		return ['token'=>$token,'refresh_token'=>$refresh_token,'isNewCustomer'=>1,'userInfo'=>['nickName'=>$nickName,'avatarUrl'=>$avatarUrl,'openid'=>$openid,'integral'=>$this->getIntegral($openid)]];
    		
    	}
	
		
    }
    
    
    
    
    /*
    *@function    getIntegral()获取积分
    *
    *
    */
    public function getIntegral($openid__ = ""){
		
		if($openid__ === ""){
			// openid 为空为外部API调用
			
			echo("外部调用API");
			
		}else{
			
			$user = usersinfo::get(['openid'=>$openid__]);
			return ($user->integral);
		
		}
    		
   
    	
    
    	
    }
    
    
    
    
    /*
    *@function        addIntegral（）    增加积分
    *
    *
    */
    
    public function addIntegral(){
    	$request=Request::instance();
    	$request->post("UID");
    	
    }
    
    
    
    /*
    *@function    getUserInfo()获取当前用户信息
    *
    */
   public function getUserInfo(){
   	$request = Request::instance();
   	$openid = $request->post("openid");

   	$user = usersinfo::where(['openid'=>$openid])->find();
   	
   	return ['err'=>'ok',"desc"=>$user];
   	
   	
   }
    
    
    
  
  
  

    
    
}

