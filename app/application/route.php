<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------



return [
    '__alias__' =>[
        'product' => 'index/Product',//直接跳转到 index模块下的Product控制器
    ],
    'getHomePorductList/[:num]' =>['product/getHomeProductList',['num'=>'\d']],
    // '__miss__' =>'index/index/index'
    //登录鉴权
    'getSession/' => ['user/User/auth',['method' => 'post']],
    // 订单发起
    'order/[:type]/[:pulisher]/[:kan]' => 'index/Product/order',
    // 绑定用户
    'regUser/:openid/:nickName/:avatarUrl'=>'user/User/regUser',
    // 获取用户信息；
    'getUserInfo' =>['user/User/getUserInfo',['method'=>'post']],
    //index
    'test' => 'product/index/test',
    
    'readchche' => 'index/index/read',
    
    'getIntegral' => 'user/user/getIntegral',
    
    //提交订单
    'submitorder' => 'product/index/submitorder',
//    查询
    'isNewCustomer' => 'product/index/isNewCustomer',
//    查询当前ID所有砍价记录
    'loadLogsRecord' => 'product/index/loadLogsRecord',
    //根据商品类型和用户ID查询订单
    'isActionByTypeAndUserId' => 'product/index/isActionByTypeAndUserId',
    
    
    'currentOrder'=> 'product/index/currentOrder'
    

];
