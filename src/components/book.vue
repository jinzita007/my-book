<template>
<div class="demo-grid">
<mu-paper>
  <mu-bottom-nav :value="bottomNav" @change="handleChange">
    <mu-bottom-nav-item value="recents" title="所有图书" icon="restore"/>
    <mu-bottom-nav-item value="favorites" title="推荐" icon="favorite"/>
    <mu-bottom-nav-item value="nearby" title="最多评分" icon="location_on"/>
    <mu-bottom-nav-item value="bangyang" title=" 2017年度榜单" icon="location_on"/>
   
  </mu-bottom-nav>
</mu-paper>
<!--<mu-text-field icon="search" class="appbar-search-field" slot="right" hintText="搜索书名" v-model="search"/> 
    <br>-->
   
    <br>
<div class="list-group" v-for="item in books" :key="item._id">
    <div class="item  col-xs-4 col-lg-4 grid-group-item">
        <div class="thumbnail">
                <img class="group list-group-image" :src="item.img_url" alt="">
                <div class="caption">
                    <h4 class="group inner list-group-item-heading">
                        {{item.title}}</h4>
                    <!--<p class="group inner list-group-item-text">
                        {{item.introduction}}
                       </p>-->
                    <div class="row">
                        <!--<div class="col-xs-12 col-md-6">
                            <p class="lead">
                                ${{item.price}}.00</p>
                        </div>-->
                        <div class="col-xs-12 col-md-6">
                            <a class="btn btn-success" href="http://www.jquery2dotnet.com">百度云下载</a>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</div>
</div>
</template>
<script>
    export default {
        created() {
          this.getBooks()
        },
        
        data(){
            return{
                books: [],
                bottomNav: 'recents',
            }
        },
        props: ['isLoginn'],
    
        methods: {
            getBooks() {
                this.$http.get('/api/books').then(res => {
                    this.books = res.data
                    console.log(res.data);   
                })
                .catch(err => {
                    console.log(err);     
                })
            },
            handleChange (val) {
              this.bottomNav = val
           },
        }
    }
</script>
<style lang="css">
   
.list-group {
    padding-left: 0;
}
.demo-grid {
 width: 80%;
 margin: 0 auto;
}
.row {
    margin-right: -15px;
    margin-left: -15px;
}
.col-xs-4 {
    /*width: 33.33333333%;*/
    width: 25%;
    float: left;
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
}
.thumbnail {
    position: relative;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    margin-bottom: 25px;
    padding: 0px;
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    border-radius: 0px;
    display: block;
    /*background-color: #fffdfd;*/
    line-height: 1.42857143;
    
    -webkit-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
}
.thumbnail>img, .thumbnail a>img {
    margin-right: auto;
    margin-left: auto;
}
/*.img-responsive, .thumbnail>img, .thumbnail a>img, .carousel-inner>.item>img, .carousel-inner>.item>a>img {
    display: block;
    width: 100% \9;
    max-width: 100%;
    height: auto;
}*/
.list-group-image {
    display: block;
    width: 50%;
    height: 200px;
    margin-top: 10px;
   /* border: 1px solid rgb(163, 163, 163);*/
}
.thumbnail .caption {
    padding: 9px;
    color: #333;
}
.list-group-item-heading {
    margin-top: 0;
    margin-bottom: 5px;
}
.list-group-item-text {
    margin: 0 0 11px;
}
.col-xs-12 {
    width: 100%;
    float: left;
}
@media (min-width: 768px){
.lead {
    font-size: 21px;
}
}
.lead {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.4;
}
.btn-success {
    color: #fff;
    background-color: #5cb85c;
    border-color: #4cae4c;
}
.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}
.container:before, .container:after, .container-fluid:before, .container-fluid:after, .row:before, .row:after, .form-horizontal .form-group:before, .form-horizontal .form-group:after, .btn-toolbar:before, .btn-toolbar:after, .btn-group-vertical>.btn-group:before, .btn-group-vertical>.btn-group:after, .nav:before, .nav:after, .navbar:before, .navbar:after, .navbar-header:before, .navbar-header:after, .navbar-collapse:before, .navbar-collapse:after, .pager:before, .pager:after, .panel-body:before, .panel-body:after, .modal-footer:before, .modal-footer:after {
    display: table;
    content: " ";
}
.clearfix:after, .dl-horizontal dd:after, .container:after, .container-fluid:after, .row:after, .form-horizontal .form-group:after, .btn-toolbar:after, .btn-group-vertical>.btn-group:after, .nav:after, .navbar:after, .navbar-header:after, .navbar-collapse:after, .pager:after, .panel-body:after, .modal-footer:after {
    clear: both;
}
.mu-paper{
    margin-bottom: 25px;
}


</style>
