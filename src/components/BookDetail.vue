<template>

    <div class="loading" v-if="loadingData">
        <div class="ball-spin-fade-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div> 
    </div>   
<mu-card class="mu-card" v-else>

  <mu-card-media class="mu-card-media">
    <img :src="book.img_url" />
  </mu-card-media>

<mu-card-title :title="book.title" :subTitle="book.author"/>

  <mu-card-text>
    {{book.introduction}}
  </mu-card-text>

  <mu-card-actions>
    <mu-flat-button label="下载地址" secondary/>
    <mu-flat-button label="购买地址" primary/>
  </mu-card-actions>
  
  <mu-raised-button @click="goBack" primary class="mu-raised-button">返回</mu-raised-button>
</mu-card>

</template>

<script>

export default {

  data () {
    return {
      book: {},
      loadingData: true,
    }
  },
  created() {
        this.getBook()
  },

  methods: {
      goBack() {
          this.$router.go(-1)
      },
      getBook() {
          //console.log(this.$route.params.title);
          let id = this.$route.params.id
          setTimeout(() => { 
          this.$http.get(`/api/book/${id}`)
          .then(res => { 
              //console.log(res.data)
              this.book = res.data; 
              this.loadingData = false
          })
          .catch(e => {
              console.log(e)
           })
        }, 1500);
          
          
      }
  }
}
</script>
<style>
.mu-card {
    margin: 0 auto;
    width: 50%;
    margin-bottom: 50px;
    margin-top: 40px;
}
.mu-card-media {
    margin: 0 auto;
    width: 25%;
    padding-top: 20px;
}
.mu-card-actions {
    margin-bottom: 20px;
}
.mu-raised-button {
    margin-bottom: 20px;
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
.detail{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
 
}

.ball-spin-fade-loader > div {
    background-color: rgb(1, 73, 206);
}


</style>




