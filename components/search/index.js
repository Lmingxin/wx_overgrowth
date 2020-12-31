// components/search/index.js
import { KeywordModel } from '../../models/keyword'
import { BookModel } from '../../models/book'
import {pqginationBev} from '../../components/behaviors/pagination'
const keywordModel = new KeywordModel();
const bookModel = new BookModel();
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[pqginationBev],
  properties: {
    more:{
      type:Boolean,
      observer:'_load_more'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching:false,
    q:"",
    loading:false,
    loadingCenter:false
  },

  attached() {
    const historyWords = keywordModel.getHistory();
    this.setData({
      historyWords
    })
    keywordModel.getHot().then(res=>{
      console.log(res);
        this.setData({
          hotWords:res.hot
        })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onCancel() {
      this.initData();
      this.triggerEvent('cancel', {})
    },
    onConfirm(event) {
      this.showLoadingCenter(); //加载动画
      this.initData();  //清空数据
      const val = event.detail.value || event.detail.text;
      this.setData({
        searching:true
      })
      bookModel.search(0,val).then(res=>{
        console.log(res);
        this.hideLoadingCenter()
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          q:val
        })
        //搜索成功后，把搜索key添加到本地
        keywordModel.addToHistory(val);
      })
    },
    onDelete(){
      this.initData();
      this.setData({
        searching:false,
        q:""
      })
    },
    //下滑触底，加载数据
    _load_more(){
      const _vm = this;
      console.log(111111);
      if(!this.data.q){
        return
      }
      if(this.data.loading){
        return
      }
      if(this.hasMore()){
        //为保证每次loading为true后，请求回来能够改为false。
        //应该把loading的改变放在hasMore后面
        this.setData({  
          loading:true
        })
        bookModel.search(this.getCurrentStart(),this.data.q).then(res=>{
          console.log(res);
          setTimeout(()=>{
            _vm.setData({
              loading:false
            })
            this.setMoreData(res.books)
          },500)
          console.log(this.data.dataArray);
        },()=>{
          this.setData({
            loading:false
          })
        })
      } 
    },
    showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },
    hideLoadingCenter(){
      this.setData({
        loadingCenter:false
      })
    }
  }
})
