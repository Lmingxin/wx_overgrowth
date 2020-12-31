export const pqginationBev = Behavior({
  data: {
    dataArray: [],
    total: 0,
    noneResult:false
  },
  methods: {
    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray);
      this.setData({
        dataArray: tempArray
      })
    },
    getCurrentStart() {
      return this.data.dataArray.length
    },
    setTotal(total) {
      this.data.total = total;
      if(total == 0){
        this.setData({
          noneResult:true
        }) 
      }
    },
    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },
    initData(){
      this.setData({
        total:0,
        dataArray:[],
        noneResult:false
      })
    }
  }
})