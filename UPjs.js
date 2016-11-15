(function($){
            $.fn.extend({
                aiiUpload:function(obj)
                {
                    if(typeof obj !="object")
                    {
                        alert('参数错误');
                        return;
                    }
                    var imageWidth,imageHeight;
                    var base64;
                    var file_num=0;
                    var fileInput=$(this);
                    var fileInputId=fileInput.attr('id');
                    createDoc('#'+fileInputId,obj.method,obj.action);
                    $('#aii_file').change(function(){
                        if(test(this.value)==false)
                        {
                            $(".section").append($('<div class=faq_no><span></span>Upload Failed</div>'));
                            $(".faq_yes").remove()
                            setTimeout(function(){
                                $(".faq_no").remove()
                            },2000)
                            
                            return;
                        }
                        var objUrl = getObjectURL(this.files[0]);
                        if (objUrl) 
                        {
                            imgBefore(objUrl,file_num);
                            render(objUrl,obj.max_h,obj.max_w,file_num);
                            file_num++;
                        }
                    });
                }
            });
            function createDoc(objID,form_method,form_action)
            {
                var element=$(objID);
                element.prepend('<form id="aii_upload_form" method="'+form_method+'" action="'+form_action+'"></form>');
            }
            function test(value)
            {
                var regexp=new RegExp("(.JPEG|.jpeg|.JPG|.jpg|.GIF|.gif|.BMP|.bmp|.PNG|.png)$",'g');
                return regexp.test(value);
            }
            function render(src,MaximgW,MaximgH,idnum)
            {
                var image=new Image();

                image.onload=function()
                {
                    
                     //图片加到canvas里面
                     var canvas=document.getElementById('canvas');
                     if(image.width>image.height)
                     {
                         imageWidth=MaximgW;
                         imageHeight=MaximgH*(image.height/image.width);
                     }
                     else if(image.width<image.height)
                     {
                         imageHeight=MaximgH;
                         imageWidth=MaximgW*(image.width/image.height);
                     }
                     else
                     {
                         imageWidth=MaximgW;
                         imageHeight=MaximgH;
                     }
                     canvas.width=imageWidth;
                     canvas.height=imageHeight;
                     var con=canvas.getContext('2d');
                     con.clearRect(0,0,canvas.width,canvas.height);
                     con.drawImage(image,0,0,imageWidth,imageHeight);
                     base64=canvas.toDataURL('image/jpeg',0.5).substr(22);
                     add_doc(base64,idnum);
                     MoreEvent();
                     
                }
                image.src=src;
            };
            //建立一個可存取到該file的url
            function getObjectURL(file) {
                var url = null ; 
                if (window.createObjectURL!=undefined) { // basic
                    url = window.createObjectURL(file) ;
                } else if (window.URL!=undefined) { // mozilla(firefox)
                    url = window.URL.createObjectURL(file) ;
                } else if (window.webkitURL!=undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file) ;
                }
                return url ; 
            }
            //预览
            function imgBefore(objUrl,idnum) 
            {
                var li='<li class="view"><img src="'+objUrl+'" id="aiiImg_'+idnum+'" idnum="'+idnum+'" /><div class="close" onclick="img_remove(this);"></div></li>'
                $('.viewList').append(li);
                var img=$('#aiiImg_'+idnum);
                //预览图片居中 填满 代码
                img.load(function(){
                    var imgw=img.width(),
                        imgh=img.height();
                        console.log(imgw);
                        console.log(imgh);
                    if(imgw>imgh)
                    {
                        img.css('height','100%');
                        img.css('width','auto');
                        img.css('marginLeft',-(img.width()-img.height())/2+'px');
                    }
                    else if(imgw<imgh)
                    {
                        img.css('width','100%');
                        img.css('height','auto');
                        img.css('marginTop',-(img.height()-img.width())/2+'px');
                    }
                });
            }

            function add_doc (base,idnum)
            {
                $('#aii_upload_form').append('<input type="hidden" name="img[]" id="f_'+idnum+'" value="'+base+'"/>');
            }

            function MoreEvent(){
                //点击删除
                     $(".upload").on("click",".dele",function(){
                        $(".faq_yes").remove()
                        if($(".upload").length>=5 && $(".dele").length==5){//等于5时
                            $(this).parents(".upload").remove();
                                var new_files='<div id="faqupload'+imgcount+'"  class="upload" >'+
                                        '<div class="preview">'+
                                            '<canvas id="canvas" class="imghead newcanvas"></canvas>'+
                                        '</div>'+
                                        '<label for="aii_file"></label>'+
                                        '<input type="file" id="aii_file" name="picFile"/>'+
                                    '</div>';
                                   $(".section").append($(new_files));
                                   render(objUrl,obj.max_h,obj.max_w,file_num);
                                   //添加提示语
                            $(".section").append($('<div class=faq_yes><span></span>Upload successful</div>'));
                        }else{//小于5时
                            $(".faq_yes").remove()
                            $(this).parents(".upload").remove();
                            $(".section").append($('<div class=faq_yes><span></span>Upload successful</div>'));
                        }
                        if($(".dele").length<=0){
                            $(".faq_yes").remove()
                        }
                    })

                var imgcount= $(".upload").length,
                First_preview=$("label").prev(".preview");

                 //不能多过5张
                 if($(".upload").length>=5){
                     $(".imghead").removeClass("newcanvas").attr('id',"");
                     $("<div class='dele'></div>").insertAfter(First_preview);
                     $(".upload>label").remove();
                     return false;
                 } 

                 $(".upload>label").remove();//有照片时，不可再次点击
                 //添加删除
                $("<div class='dele'></div>").insertAfter('.preview')
                if($(".dele").length>$(".upload").length){
                   $('.dele').remove();
                   $("<div class='dele'></div>").insertAfter('.preview')
                }
                 $(".faq_yes").remove()
                 //添加一个新的可点击的上传文件
                 var new_files='<div id="faqupload'+imgcount+'"  class="upload">'+
                         '<div class="preview">'+
                             '<canvas id="canvas" class="imghead newcanvas"></canvas>'+
                         '</div>'+
                         '<label for="aii_file"></label>'+
                         '<input type="file" id="aii_file" name="picFile"/>'+
                     '</div>';
                     $(".section").append($(new_files));
                     //添加提示语
                     $(".section").append($('<div class=faq_yes><span></span>Upload successful</div>'));
                     $(".imghead").attr('id',"");
                     $(".newcanvas").attr('id',"canvas");
                     if($(".newcanvas").length>1){
                         $(".imghead").removeClass("newcanvas").attr('id',"");
                     }
                     $("label").prev().find("canvas").addClass("newcanvas")
                     $(".newcanvas").attr('id',"canvas");
                
            }
        })(jQuery);
        function img_remove(element)
        {
            var num=$(element).prev().attr('idnum');
            $(element).parent().remove();
            $('#f_'+num).remove();
            console.log('asdf');
        }