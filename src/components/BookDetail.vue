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
<div class="rating">
          <span :class="'allstar' + book.rating.stars"></span>
          <span class="rating_nums">{{book.rating.everage}}</span>
      </div>
  <mu-card-text>
    {{book.introduction}}
  </mu-card-text>

  <!--<mu-card-actions>
    <mu-flat-button label="下载地址" secondary/>
    <mu-flat-button label="购买地址" primary/>
  </mu-card-actions>-->
  
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
         // setTimeout(() => { 
          this.$http.get(`/api/books/${id}`)
          .then(res => { 
              //console.log(res.data)
              this.book = res.data; 
              this.loadingData = false
          })
          .catch(e => {
              console.log(e)
           })
       // }, 1000);
          
          
      }
  }
}
</script>
<style>
.allstar50, .allstar45, .allstar40, .allstar35, .allstar30, .allstar25, .allstar20, .allstar15, .allstar10, .allstar05, .allstar00, .rating1-t, .rating15-t, .rating2-t, .rating25-t, .rating3-t, .rating35-t, .rating4-t, .rating45-t, .rating5-t, .rating-t, .starb ~ .stars5, .starb ~ .stars4, .starb ~ .stars3, .starb ~ .stars2, .starb ~ .stars1, .collectors .stars5, .collectors .stars4, .collectors .stars3, .collectors .stars2, .collectors .stars1 {
    display: inline-block;
    zoom: 1;
    background: url(https://img3.doubanio.com/f/shire/0147ca9efddcac80050854590d26bee587b008df/pics/rating_icons/ic_rating_s.png) no-repeat;
    background: -webkit-image-set(url(https://img3.doubanio.com/f/shire/0147ca9efddcac80050854590d26bee587b008df/pics/rating_icons/ic_rating_s.png) 1x, url(https://img3.doubanio.com/f/shire/0147ca9efddcac80050854590d26bee587b008df/pics/rating_icons/ic_rating_s@2x.png) 2x) no-repeat;
    background: -moz-image-set(url(https://img3.doubanio.com/f/shire/0147ca9efddcac80050854590d26bee587b008df/pics/rating_icons/ic_rating_s.png) 1x, url(https://img3.doubanio.com/f/shire/0147ca9efddcac80050854590d26bee587b008df/pics/rating_icons/ic_rating_s@2x.png) 2x) no-repeat;
    background: -o-image-set(url(https://img3.doubanio.com/f/shire/0147ca9efddcac80050854590d26bee587b008df/pics/rating_icons/ic_rating_s.png) 1x, url(https://img3.doubanio.com/f/shire/0147ca9efddcac80050854590d26bee587b008df/pics/rating_icons/ic_rating_s@2x.png) 2x) no-repeat;
    background: -ms-image-set(url(https://img3.doubanio.com/f/shire/0147ca9efddcac80050854590d26bee587b008df/pics/rating_icons/ic_rating_s.png) 1x, url(https://img3.doubanio.com/f/shire/0147ca9efddcac80050854590d26bee587b008df/pics/rating_icons/ic_rating_s@2x.png) 2x) no-repeat;
    width: 55px;
    height: 11px;
    margin: 0 3px 0 0;
    overflow: hidden;
}
.allstar50,.status-item .allstar45,.status-item .allstar40,.status-item .allstar35,.status-item .allstar30,.status-item .allstar25,.status-item .allstar20,.status-item .allstar15,.status-item .allstar10,.status-item .allstar05,.status-item .allstar00,.status-item .rating1-t,.status-item .rating15-t,.status-item .rating2-t,.status-item .rating25-t,.status-item .rating3-t,.status-item .rating35-t,.status-item .rating4-t,.status-item .rating45-t,.status-item .rating5-t,.status-item .rating-t,.status-item .starb ~ .stars5,.status-item .starb ~ .stars4,.status-item .starb ~ .stars3,.status-item .starb ~ .stars2,.status-item .starb ~ .stars1,.status-item .collectors .stars5,.status-item .collectors .stars4,.status-item .collectors .stars3,.status-item .collectors .stars2,.status-item .collectors .stars1{margin:0 0 0 4px}.allstar50{background-position:0 0px}.allstar45{background-position:0 -11px}.allstar40{background-position:0 -22px}.allstar35{background-position:0 -33px}.allstar30{background-position:0 -44px}.allstar25{background-position:0 -55px}.allstar20{background-position:0 -66px}.allstar15{background-position:0 -77px}.allstar10{background-position:0 -88px}.allstar05{background-position:0 -99px}.allstar00{background-position:0 -110px}
.rating_nums {
    padding-left: 0;
}

.rating_nums, .rating_num {
    color: #e09015;
    font-size: 12px;
    padding: 0 3px;
}


.mu-card {
    text-align: center;
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




