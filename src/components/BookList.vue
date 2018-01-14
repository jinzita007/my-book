<template>

    <div class="loading" v-if="isLoaingData">
        <div class="ball-spin-fade-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
<!-- 搜索书名 -->
<div class="list" v-else>
<mu-text-field icon="search" class="appbar-search-field" slot="right" hintText="搜索书名" v-model="search"/>
    <!-- 书籍列表 -->
    <mu-table :fixedHeader="true" :showCheckbox="false" >
        <mu-thead>
          <mu-tr>
            <mu-th>书籍图片</mu-th>
            <mu-th>书籍名称</mu-th>
            <mu-th>作者</mu-th>
            <mu-th>简介</mu-th>
            <mu-th>价格</mu-th>
            <mu-th>操作</mu-th>
          </mu-tr>
        </mu-thead>

        <mu-tbody>
          <mu-tr v-for="book in filteredBooks" :key="book.id">
            <mu-td><img class="book-poster" :src="book.img_url"></mu-td>
            <mu-td>{{ book.title }}</mu-td>
            <mu-td class="movie-rating">{{ book.author }}</mu-td>
            <mu-td>
              <p class="book-introduction">{{ book.introduction }}</p></mu-td>
               <mu-td class="movie-rating">{{ book.price }}元</mu-td>
            <mu-td>
              <mu-raised-button class="detail_color" @click="showDetail(book._id)" label="详细"/>
              <mu-raised-button @click="openEditBookModal(book)" label="修改" primary/>
              <mu-raised-button @click="removeBook(book)" label="删除" secondary/>
            </mu-td>
          </mu-tr>
        </mu-tbody>

        
    </mu-table>
    <!-- 添加书籍按钮 -->
    <mu-float-button icon="add" secondary class="demo-float-button" @click="openAddBookModal"/>
        <!-- 添加书籍表单 -->
        <vodal :show="addBookModal" animation="slideDown" :width="500" :height="600" :closeButton="false">
            <mu-text-field v-model="title" fullWidth icon="book" label="书籍名称" labelFloat/><br/>
            <mu-text-field v-model="author" fullWidth icon="account_box" label="作者" labelFloat/><br/>
            <mu-text-field v-model="img_url" fullWidth icon="picture_in_picture" label="书籍地址" labelFloat/><br/>
            <mu-text-field v-model="price" fullWidth icon="attach_money" label="价格" labelFloat/><br/>
            <mu-text-field v-model="introduction"
            multiLine :rows="2" :rowsMax="6"
            fullWidth icon="description" label="简介" labelFloat/><br/>
            <p style="color:red">{{msg.message}}</p>
            <mu-raised-button @click="closeModal" label="取消" icon="undo"  />
            <mu-raised-button @click="addMovie" label="确定" icon="check" primary/>
        </vodal>

    <!--编辑书籍表单-->
    <vodal :show="editBookModal" animation="slideDown" :width="500" :height="600" :closeButton="false">
        <mu-text-field v-model="title" fullWidth icon="book" label="书籍名称" labelFloat/><br/>
        <mu-text-field v-model="author" fullWidth icon="account_box" label="作者" labelFloat/><br/>
        <mu-text-field v-model="img_url" fullWidth icon="picture_in_picture" label="书籍地址" labelFloat/><br/>
        <mu-text-field v-model="price" fullWidth icon="attach_money" label="价格" labelFloat/><br/>
        <mu-text-field v-model="introduction"
        multiLine :rows="2" :rowsMax="6"
        fullWidth icon="description" label="简介" labelFloat/><br/>
        <mu-raised-button @click="closeModal" label="取消" icon="undo"  />
        <mu-raised-button @click="editMovie" label="确定" icon="check" primary/>
    </vodal>
 
  </div>
</template>


<script>
export default {
created() {
    this.getBooks()
  },
  data () {
    return {
      title: '',
      author: '',
      price: '',
      introduction: '',
      img_url: '',
      search:'',
      books: [],
      msg: '',
      addBookModal: false,
      editBookModal: false,
      isLoaingData: true
    }
  },

  computed: {
    filteredBooks() {
        var self=this;
        return this.books.filter(book => {
            return book.title.toLowerCase().indexOf(self.search.toLowerCase()) > -1
        })
    }
  },
  methods: {
      //获取所有书籍方法
      getBooks() {
        setTimeout(() => {
          this.$http.get('/api/book')
          .then(res => {
              console.dir(res.data)
              this.books = res.data
              this.isLoaingData = false     
          })
          .catch(err => {
              this.toastr.error(`${err.message}`, 'ERROR!')
              console.log(err);  
          })
           }, 1000)
       
      },
      // 打开添加书籍modal的方法
       openAddBookModal() {
          this.addBookModal = true
      },
       //关闭取消
       // 关闭modal的方法
        closeModal() {
            this.addBookModal = false
            this.editBookModal = false
            this.title = ''
            this.author = ''
            this.price = ''
            this.introduction = ''
            this.img_url = ''
            this.book_id = ''
            this.msg = ''
        },
       
       //增加之后就提交方法
       addMovie(){
           this.$http.post('/api/book', {
               title: this.title,
               author: this.author,
               price: this.price,
               introduction: this.introduction,
               img_url: this.img_url
           })
           .then(res => {
               this.toastr.success('新增成功！')
               //console.log("新增成功！");
               //console.log(res.data)
               this.addBookModal = false
               this.title = ''
               this.author = ''
               this.price = ''
               this.introduction = ''
               this.img_url = ''
               this.getBooks()
           })
           .catch(err => {
               if (err.response) {
                    this.msg = err.response.data
                    //this.toastr.warning('保存失败！')
                    console.log(err.response.data)
                    
               } else {
                    console.log(err)
               }
              
             
           })
       },
       //打开增加弹窗
        //打开编辑
        openEditBookModal(book) {
            this.editBookModal = true
            this.title = book.title
            this.author = book.author
            this.price = book.price
            this.introduction = book.introduction
            this.img_url = book.img_url
            this.book_id = book._id
        },
        //编辑之后就提交
        editMovie(){
            let id = this.book_id
            this.$http.put(`/api/book/${id}`, {
                title : this.title,
                author: this.author,
                price: this.price,
                introduction: this.introduction,
                img_url: this.img_url
            })
            .then(res => {
                this.toastr.success("更新书籍成功！")
                //console.log("更新书籍成功！");
                this.editBookModal = false
                this.getBooks()
                this.author = ''
                this.price = ''
                this.introduction = ''
                this.img_url = ''
                this.book_id = ''   
            })
            .catch(err => {
                console.log(err);   
            })
        },
        //删除一个书籍
        removeBook(book) {
            let id = book._id
            this.$http.delete(`/api/book/${id}`)
            .then(res => {
                this.toastr.success("删除成功.")
                console.log(res.data)
                this.getBooks()
            })
            .catch(err => {
                console.log(err);
            })
        },
        //跳转到书籍详情页方法
        showDetail(_id) {
            //console.log(_id);
            //let id = this.book_id
            this.$router.push(`/book/${_id}`)
    }
     
  }
}
</script>

<style>
.mu-th{
  text-align: center !important;
}
.mu-td{
  text-align: center !important;
}
.book-poster{
    width: 80px;
    padding: 4px 0;
  }
.book-introduction{
    overflow: hidden;
    text-overflow: ellipsis;
   
  }
.mu-raised-button{
      min-width: 44px;
  }
.appbar-search-field .mu-text-field-input {
    color: rgb(27, 27, 27);
    margin-bottom: 0;
}

.appbar-search-field .mu-text-field-focus-line {
     background-color: rgb(97, 97, 97);
}
.appbar-search-field {
    color: rgb(27, 27, 27);
    margin-bottom: 0;
}
.appbar-search-field.focus-state{
    color: rgb(78, 78, 78);
}
.appbar-search-field .mu-text-field-hint {
    color: rgba(59, 59, 59, 0.54);
    padding: 0px 60px 0px 0px;
}
.detail_color {
    color: white;
    background-color: #43a047
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


