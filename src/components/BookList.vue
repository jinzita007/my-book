<template>

    <div class="loading" v-if="isLoaingData">
        <div class="ball-spin-fade-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
<!-- 搜索书名 -->

<div class="list" v-else>
    <br>
    <div class="demo-search">
          <!-- 添加书籍按钮 -->
          <mu-raised-button class="detail_color" @click="openAddBookModal" label="新增" style="margin-right: 20px;"/>
         <mu-text-field icon="search" class="appbar-search-field" slot="right" hintText="搜索书名" v-model="search"/> 
         <mu-raised-button @click="logout" label="注销" style="margin-left: 20px;" primary/>
    <br>
    </div>
    
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
    <!-- TAG标签 -->
    <div class="tags-wrap mu-text-field has-label no-empty-state has-icon full-width">
        <i class="mu-text-field-icon mu-icon material-icons">picture_in_picture</i>
        <div class="tags mu-text-field-content">
            <div class="mu-text-field-label">标签</div>
        <span class="content" v-for="(tag, index) in tags" :key="index">{{tag}}
        <span class="del" @click="del(index)">&times;</span>
        </span>
        <input class="tags-input mu-text-field-input" type="text" v-model="newTag"
        v-on:keyup.delete.stop="delLastTag()"
        v-on:keyup.enter="add(newTag)" placeholder="click enter">
        <div><hr class="mu-text-field-line"> <hr class="mu-text-field-focus-line"></div>
        </div>
    </div>
    <!-- 测试专用的 -->
     <!--<div class="form-group">
       <label for="">Tags:</label>
       <code>{{tags}}</code>
     </div>-->
        <br/>
        <mu-text-field v-model="img_url" fullWidth icon="picture_in_picture" label="书籍地址" labelFloat/><br/>
        <mu-text-field v-model="price" fullWidth icon="attach_money" label="价格" labelFloat/><br/>
        <mu-text-field v-model="introduction"
        multiLine :rows="2" :rowsMax="6"
        fullWidth icon="description" label="简介" labelFloat/><br/>
        <div class="demo-button">
        <mu-raised-button @click="closeModal" label="取消" icon="undo"  />
        <mu-raised-button @click="editMovie" label="确定" icon="check" primary/>
        </div>
    </vodal>
 
  </div>
</template>


<script>
import { mapActions } from "vuex";

export default {
  created() {
    this.getBooks();
  },
  data() {
    return {
      user: {
        name: ""
      },
      title: "",
      author: "",
      price: "",
      introduction: "",
      img_url: "",
      search: "",
      books: [],
      newTag: "",
      //tags: ['Vue', 'React', 'Jquery']
      tags: [],
      msg: "",
      addBookModal: false,
      editBookModal: false,
      isLoaingData: true
      //islogin: false
    };
  },
  beforeCreate() {
    //主页刷新的时候，如果cookie时效到了，就提示未登录
    this.$http
      .get("/api/session")
      .then(res => {
        console.dir(res.data);
        if (res.data.error) {
          console.log(res.data.error);

          //this.toastr.error(res.data.error)
          // this.$message.error(res.data.error)
          this.user.name = null;
          return false;
        } else {
          let user = localStorage.getItem("user");
          if (user) {
            //console.log(user)
            this.user.name = user;
            //this.$router.push('/bookList')
          }
        }
      })
      .catch(err => {
        this.toastr.error(err.message);
        //this.$message.error(`${err.message}`)
      });
  },

  computed: {
    filteredBooks() {
      var self = this;
      return this.books.filter(book => {
        return book.title.toLowerCase().indexOf(self.search.toLowerCase()) > -1;
      });
    }
  },
  methods: {
    //注销
    ...mapActions(["Logout"]),
    logout() {
      this.Logout = null;
      this.user.username = null;
      this.$http
        .get("/api/logout")
        .then(res => {
          console.dir(res.data);
          this.toastr.success(res.data.message);
          //return false
          this.$router.push({ path: "/login" });
        })
        .catch(err => {
          this.toastr.error(err.message);

          //this.$message.error(`${err.message}`)
        });
    },
    //获取所有书籍方法
    getBooks() {
      setTimeout(() => {
        this.$http
          .get("/api/book")
          .then(res => {
            console.dir(res.data);
            this.books = res.data;
            this.isLoaingData = false;
          })
          .catch(err => {
            this.toastr.error(`${err.message}`, "ERROR!");
            console.log(err);
          });
      }, 1000);
    },

    // 打开添加书籍modal的方法
    openAddBookModal() {
      this.addBookModal = true;
    },
    //关闭取消
    // 关闭modal的方法
    closeModal() {
      this.addBookModal = false;
      this.editBookModal = false;
      this.title = "";
      this.author = "";
      this.price = "";
      this.introduction = "";
      this.img_url = "";
      this.book_id = "";
      this.msg = "";
    },

    //增加之后就提交方法
    addMovie() {
      this.$http
        .post("/api/book", {
          title: this.title,
          author: this.author,
          price: this.price,
          introduction: this.introduction,
          img_url: this.img_url
        })
        .then(res => {
          this.toastr.success("新增成功！");
          //console.log("新增成功！");
          //console.log(res.data)
          this.addBookModal = false;
          this.title = "";
          this.author = "";
          this.price = "";
          this.introduction = "";
          this.img_url = "";
          this.getBooks();
        })
        .catch(err => {
          if (err.response) {
            this.msg = err.response.data;
            //this.toastr.warning('保存失败！')
            console.log(err.response.data);
          } else {
            console.log(err);
          }
        });
    },
    //打开增加弹窗
    //打开编辑
    openEditBookModal(book) {
      this.editBookModal = true;
      this.title = book.title;
      this.author = book.author;
      this.price = book.price;
      this.tags = book.tags;
      this.introduction = book.introduction;
      this.img_url = book.img_url;
      this.book_id = book._id;
    },
    //编辑之后就提交
    editMovie() {
      let id = this.book_id;
      this.$http
        .put(`/api/book/${id}`, {
          title: this.title,
          author: this.author,
          price: this.price,
          tags: this.tags,
          introduction: this.introduction,
          img_url: this.img_url
        })
        .then(res => {
          this.toastr.success("更新书籍成功！");
          //console.log("更新书籍成功！");
          this.editBookModal = false;
          this.getBooks();
          this.author = "";
          this.price = "";
          this.tags = "";
          this.introduction = "";
          this.img_url = "";
          this.book_id = "";
        })
        .catch(err => {
          console.log(err);
        });
    },

    //删除一个书籍
    removeBook(book) {
      let id = book._id;
      this.$http
        .delete(`/api/book/${id}`)
        .then(res => {
          this.toastr.success("删除成功.");
          console.log(res.data);
          this.getBooks();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //跳转到书籍详情页方法
    showDetail(_id) {
      //console.log(_id);
      //let id = this.book_id
      this.$router.push(`/book/${_id}`);
    },
    //关闭
    handleClose() {
      window.alert("你点击了删除按钮");
    },

    //TAG标签功能
    add(tag) {
      if (tag && this.tags.indexOf(tag) === -1) {
        this.tags.push(tag);
      }
      this.newTag = "";
    },
    del(index) {
      this.tags.splice(index, 1);
    },
    delLastTag() {
      if (this.newTag) {
        return;
      }
      this.tags.pop();
    }
  }
};
</script>

<style>
.demo-button {
  text-align: center;
}
.demo-chip {
  margin: 4px;
}

.demo-search {
  text-align: center;
}
.mu-th {
  text-align: center !important;
}
.mu-td {
  text-align: center !important;
}
.book-poster {
  width: 80px;
  padding: 4px 0;
}
.book-introduction {
  overflow: hidden;
  text-overflow: ellipsis;
}
.mu-raised-button {
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
.appbar-search-field.focus-state {
  color: rgb(78, 78, 78);
}
.appbar-search-field .mu-text-field-hint {
  color: rgba(59, 59, 59, 0.54);
  padding: 0px 60px 0px 0px;
}
.detail_color {
  color: white;
  background-color: #43a047;
}

.loading {
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

/* 标签TAG样式 */
/*.tags-wrap {
  background-color: #fff;
  border: 1px solid #ccc;
  overflow: hidden;
  padding-left: 4px;
  padding-top: 4px;
  cursor: text;
  text-align: left;
  -webkit-appearance: textfield;
}

.tags-wrap::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
}*/

/*.tags-input {
  background: transparent;
  border: 0;
  color: #777;
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 6px;
  margin-top: 1px;
  outline: none;
  padding: 4px;
  padding-left: 0;
  width: 80px;
}*/

.content {
  background-color: #e0e0e0;
  border-radius: 8px;
  color: rgba(0, 0, 0, 0.87);
  line-height: 25px;
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 4px;
  margin-right: 4px;
  padding: 6px;
}

.del {
  cursor: pointer;
  font-weight: 700;
  color: #1f1f1f;
}
</style>


