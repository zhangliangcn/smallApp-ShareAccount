Component({
  externalClasses: ["custom-class"],

  
  properties:{
    product_img: String,
    product_price: Number
  },
  data:{
    img_product:"https://temp-1251251237.cos.ap-chengdu.myqcloud.com/test-temp-product.jpg",
    price:22
  },
  attached:function(res){
    // console.log(res)
  },
  observers:{
    
  }





})