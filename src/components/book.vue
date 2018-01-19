<template>
<div class="loading" v-if="isLoaingData">
        <div class="ball-spin-fade-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
</div>
<div class="demo-grid" v-else>
<mu-paper>
  <mu-bottom-nav :value="bottomNav" @change="handleChange">
    <mu-bottom-nav-item value="tab1" title="所有图书" icon="restore"/>
    <mu-bottom-nav-item value="tab2" title="最多评分" icon="location_on"/>
  </mu-bottom-nav>
</mu-paper>
<div class="search-center">
<mu-text-field icon="search" class="appbar-search-field" slot="right" hintText="搜索书名" v-model="search"/> 
<mu-raised-button @click="searchClick" label="确定" primary/>
<mu-raised-button @click="getBooks" label="全部图书" primary/>
</div>
<br><br>

<!-- tab1 -->
<div v-if="bottomNav === 'tab1'">

    <!--全部图书列表-->
    <div class="wrapper">
        <div class="list-main">
            <ul class="list-ul">
                <li class="list-group" v-show="isbook" v-for="item in books" :key="item._id">
                     <a @click="showDetail(item._id)">
                       <img class="group list-group-image" :src="item.img_url" alt="">
                     </a>
                     <p>{{item.title}}</p>  
                     <strong>{{item.rating.everage}}</strong>  
                </li>
            </ul>
        </div> 
    </div>

</div>

<!-- tab2 -->
<div v-if="bottomNav === 'tab2'">
<!-- 评分最多 -->
    <div class="wrapper">
        <div class="list-main">
            <ul class="list-ul">
                <li class="list-group" v-show="isbook" v-if="item.rating.everage >= 9.0" v-for="item in scorebooks">
                     <a @click="showDetail(item._id)">
                       <img class="group list-group-image" :src="item.img_url" alt="">
                     </a>
                     <p>{{item.title}}</p>  
                     <strong>{{item.rating.everage}}</strong>  
                </li>
            </ul>
        </div> 
    </div>
    
</div>


<!--搜索图书列表-->
<div class="wrapper">
        <div class="list-main">
            <ul class="list-ul">
                <li class="list-group" v-for="item,index in book" :key="item.id">
                     <a @click="showDetail(item._id)">
                       <img class="group list-group-image" :src="item.img_url" alt="">
                     </a>
                     <p>{{item.title}}</p>  
                     <strong>{{item.rating.everage}}</strong>  
                </li>
            </ul>
        </div> 
</div>





</div>
</template>
<script>
    export default {
        created() {
          this.searchClick()
          this.getBooks()
        },
        
        data(){
            return{
                books: [],
                bottomNav: 'tab1',
                search: '',
                book: [],
                scorebooks:[],
                isbook: false,
                isLoaingData: true
            }
        },
        props: ['isLoginn'],
    
        methods: {
            //获取所有图书
            getBooks() {
                this.$http.get('/api/books').then(res => {
                    this.books = res.data
                    this.scorebooks = res.data
                    //console.log(res.data) 
                    this.isLoaingData = false
                    this.isbook = true
                    this.book  = ''
                    this.search = ''  
                })
                .catch(err => {
                    console.log(err);     
                })
            },
            //评分最多
         
            handleChange (val) {

              this.bottomNav = val
           },
            //搜索书名
        searchClick() {

               this.$http.get('/api?search='+this.search).then(res => {
    
                if(res.data.success === false) {
                     this.toastr.warning(res.data.message)
                } else {
                     //console.log(res.data)
                    this.toastr.success(res.data.message)
                    this.book = res.data.allbook
                    //console.log(this.search);
                    this.isbook = false
                    this.isLoaingData = false
                }
             
              
          })
          .catch(err => {
                    console.log(err);     
                })
         },

        showDetail(_id) {
            this.$router.push(`/book/${_id}`);
         }
        },
        computed: {
       
        }
    }
</script>
<style lang="css">

.wrapper {
    width: 950px;
    margin: 0 auto;
}
.list-main {
    overflow: hidden;
    zoom: 1;
    /*border: 1px dashed red;*/
}
.list-ul {
    margin-left: 60px;
}
.list-ul li {
    display: inline-block;
    width: 100px;
    vertical-align: top;
    margin-right: 60px;
    text-align: center;
    margin-bottom: 30px;
}

.list-ul li img {
    width: 100px;
    height: 141px;
}
   
.list-ul li p {
    margin: 5px 0 0;
    height: 44px;
    overflow: hidden;
}
.list-ul li strong {
    color: #ffb47a;
}
.list-ul li a:hover{
   cursor:pointor!important;
}
.row {
    margin-right: -15px;
    margin-left: -15px;
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
/*.mu-paper-1{
    margin-bottom: 25px;
}*/
.mu-bottom-nav {
    margin-bottom: 25px;
}
.search-center{
    text-align: center;
    margin: 0 auto;
}
.mu-text-field-hint{
    width: 70%;
}



.loading{
    position: absolute;
    top: 20%;
    left: 50%;
    box-sizing: border-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-preferred-size: 25%;
    flex-basis: 25%;
    max-width: 25%;
    height: 200px;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;

}

.ball-spin-fade-loader > div {
    background-color: rgb(1, 73, 206);
}
</style>
