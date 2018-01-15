<template>
  <div class="gridlist-demo-container">
    <mu-grid-list class="gridlist-inline-demo">
    <mu-sub-header>图书展示</mu-sub-header>
    <mu-grid-tile v-for="item in books" :key="item._id">
      <img :src="item.img_url"/>
      <span slot="title">{{item.title}}</span>
      <span slot="subTitle">by <b>{{item.author}}</b></span>
      <mu-icon-button icon="star_border" slot="action"/>
    </mu-grid-tile>
  </mu-grid-list>
</div>
</template>
<script>
    export default {
        created() {
          this.getBooks()
        },
        data(){
            return{
                msg: 'hhh',
                books: []
            }
        },
    
        methods: {
            getBooks() {
                this.$http.get('/api/books').then(res => {
                    this.books = res.data
                    console.log(res.data);   
                })
                .catch(err => {
                    console.log(err);     
                })
            }
        }
    }
</script>
<style>
.gridlist-demo-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.gridlist-inline-demo{
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
</style>

