(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2e943838"],{"5c83":function(e,t,n){"use strict";n("a481"),n("6762"),n("2fdb");var o={bind:function(e,t,n){var o=e.querySelector(".el-dialog__header"),a=e.querySelector(".el-dialog");o.style.cssText+=";cursor:move;",a.style.cssText+=";top:0px;";var i=function(){return window.document.currentStyle?function(e,t){return e.currentStyle[t]}:function(e,t){return getComputedStyle(e,!1)[t]}}();o.onmousedown=function(e){var t=e.clientX-o.offsetLeft,r=e.clientY-o.offsetTop,l=a.offsetWidth,s=a.offsetHeight,c=document.body.clientWidth,u=document.body.clientHeight,d=a.offsetLeft,p=c-a.offsetLeft-l,f=a.offsetTop,h=u-a.offsetTop-s,g=i(a,"left"),m=i(a,"top");g.includes("%")?(g=+document.body.clientWidth*(+g.replace(/\%/g,"")/100),m=+document.body.clientHeight*(+m.replace(/\%/g,"")/100)):(g=+g.replace(/\px/g,""),m=+m.replace(/\px/g,"")),document.onmousemove=function(e){var o=e.clientX-t,i=e.clientY-r;-o>d?o=-d:o>p&&(o=p),-i>f?i=-f:i>h&&(i=h),a.style.cssText+=";left:".concat(o+g,"px;top:").concat(i+m,"px;"),n.child.$emit("dragDialog")},document.onmouseup=function(e){document.onmousemove=null,document.onmouseup=null}}}},a=function(e){e.directive("el-drag-dialog",o)};window.Vue&&(window["el-drag-dialog"]=o,Vue.use(a)),o.install=a;t["a"]=o},6724:function(e,t,n){"use strict";n("8d41");var o="@@wavesContext";function a(e,t){function n(n){var o=Object.assign({},t.value),a=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},o),i=a.ele;if(i){i.style.position="relative",i.style.overflow="hidden";var r=i.getBoundingClientRect(),l=i.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":(l=document.createElement("span"),l.className="waves-ripple",l.style.height=l.style.width=Math.max(r.width,r.height)+"px",i.appendChild(l)),a.type){case"center":l.style.top=r.height/2-l.offsetHeight/2+"px",l.style.left=r.width/2-l.offsetWidth/2+"px";break;default:l.style.top=(n.pageY-r.top-l.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",l.style.left=(n.pageX-r.left-l.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return l.style.backgroundColor=a.color,l.className="waves-ripple z-active",!1}}return e[o]?e[o].removeHandle=n:e[o]={removeHandle:n},n}var i={bind:function(e,t){e.addEventListener("click",a(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[o].removeHandle,!1),e.addEventListener("click",a(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[o].removeHandle,!1),e[o]=null,delete e[o]}},r=function(e){e.directive("waves",i)};window.Vue&&(window.waves=i,Vue.use(r)),i.install=r;t["a"]=i},"8d41":function(e,t,n){},ad0b:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("el-row",[n("el-card",[n("div",{staticClass:"filter-container",staticStyle:{"margin-bottom":"10px"}},[n("el-select",{attrs:{multiple:!1,filterable:"",remote:"","reserve-keyword":"",placeholder:"全部仓库",clearable:""},on:{clear:e.handleFilter,change:e.handleFilter},model:{value:e.listQuery.WareHouseCode,callback:function(t){e.$set(e.listQuery,"WareHouseCode",t)},expression:"listQuery.WareHouseCode"}},e._l(e.WareHouseList,function(e){return n("el-option",{key:e.Code,attrs:{label:e.Name,value:e.Code}})}),1),e._v(" "),n("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",clearable:"",format:"yyyy 年 MM 月 dd 日","value-format":"yyyy-MM-dd HH:mm:ss"},on:{blur:e.handleFilter},model:{value:e.Value,callback:function(t){e.Value=t},expression:"Value"}}),e._v(" "),n("el-input",{staticClass:"filter-item",attrs:{placeholder:"物料编码、物料名称、物料条码",clearable:""},on:{clear:e.handleFilter},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.MaterialCode,callback:function(t){e.$set(e.listQuery,"MaterialCode",t)},expression:"listQuery.MaterialCode"}}),e._v(" "),n("el-input",{staticClass:"filter-item",attrs:{placeholder:"供应商编码、供应商名称",clearable:""},on:{clear:e.handleFilter},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.SupplierCode,callback:function(t){e.$set(e.listQuery,"SupplierCode",t)},expression:"listQuery.SupplierCode"}}),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-button",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("查询")]),e._v(" "),n("el-dropdown",{attrs:{size:"small",placement:"bottom",trigger:"click"},on:{command:e.batchOperate}},[n("el-button",{staticClass:"filter-button",attrs:{loading:e.downloadLoading,type:"primary"}},[e._v("\n            导出\n            "),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{attrs:{command:"All_Export"}},[e._v("全部导出")]),e._v(" "),n("el-dropdown-item",{attrs:{command:"Condition_Export"}},[e._v("按条件导出")])],1)],1)],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.TableKey,staticStyle:{width:"100%","min-height":"100%"},attrs:{data:e.list,"header-cell-style":{background:"#F5F7FA"},border:"",fit:"",size:"mini","highlight-current-row":""},on:{"selection-change":e.CheckedFun,"sort-change":e.sortChange}},[n("el-table-column",{attrs:{type:"index",width:"50",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"物料名称",width:"200","show-overflow-tooltip":"",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.MaterialName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"库龄",width:"160",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.StockAge))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"供应商名称",width:"120","show-overflow-tooltip":"",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.SupplierName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"批次",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.BatchCode))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"总重量(g)",width:"90",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{staticStyle:{color:"green"}},[e._v(e._s(t.row.Quantity))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"单位",width:"80",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.MaterialUnit))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"物料条码",width:"160",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.MaterialLabel))])]}}])}),e._v(" "),n("el-table-column",{attrs:{sortable:"custom",label:"上架时间",prop:"CreatedTime",width:"200",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.CreatedTime))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"仓库名称",width:"120",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.WareHouseName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"库位地址",width:"150",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.LocationCode))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"物料编码",width:"160",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.MaterialCode))])]}}])})],1),e._v(" "),n("div",{staticClass:"pagination-container"},[n("el-pagination",{attrs:{"current-page":e.listQuery.Page,"page-sizes":[15,30,45,60],"page-size":e.listQuery.Rows,total:e.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)],1)],1)},a=[],i=(n("ac6a"),n("d43b")),r=n("6724"),l=n("5c83"),s={name:"StockAge",directives:{elDragDialog:l["a"],waves:r["a"]},data:function(){return{total:null,listLoading:!1,listQuery:{Page:1,Rows:15,MaterialCode:"",WareHouseCode:"",WareHouseName:"",SupplierCode:"",Status:void 0,MaterialName:"",begin:"",end:""},Value:"",downloadLoading:!1,TableKey:0,list:null,StockAge:0,WareHouseList:[],checkBoxData:[]}},watch:{},created:function(){this.getList(),this.GetWareHouseList()},methods:{getList:function(){var e=this;this.listLoading=!0;var t=new Date,n=t.getFullYear(),o=t.getMonth()+1,a=t.getDate(),r=t.getHours(),l=t.getMinutes(),s=t.getSeconds(),c=n+"-"+o+"-"+a+" "+r+":"+l+":"+s;this.Value.length>0&&(this.listQuery.begin=this.Value[0],this.listQuery.end=this.Value[1]),Object(i["m"])(this.listQuery).then(function(t){var n=JSON.parse(t.data.Content);n.rows.forEach(function(t){null!==t.CreatedTime&&0!==t.CreatedTime&&(e.StockAge=e.dayDiff(t.CreatedTime,c),t.StockAge=e.StockAge)}),e.list=n.rows,e.total=n.total,e.Value="",setTimeout(function(){e.listLoading=!1},1e3)})},dayDiff:function(e,t){var n=new Date(e),o=new Date(t),a=o.getTime()-n.getTime(),i=Math.floor(a/864e5),r=a%864e5,l=Math.floor(r/36e5);return i+"天"+l+"小时"},handleFilter:function(){this.listQuery.Page=1,this.getList()},handleSizeChange:function(e){this.listQuery.Rows=e,this.getList()},handleCurrentChange:function(e){this.listQuery.Page=e,this.getList()},beforeUpload:function(e){var t="application/vnd.ms-excel"===e.type,n="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"===e.type;return t|n},handleExceed:function(e,t){this.$message.warning("当前限制选择 1 个文件，请删除后继续上传")},uploadFile:function(e){var t=this,n=e.file,o=new FormData;o.append("file",n),o.append("comId",this.comId),Object(i["p"])(o).then(function(e){var n=JSON.parse(e.data.Content);n.Success?(t.dialogFormVisible=!1,t.getList(),t.$message({title:"成功",message:"导入成功",type:"success",duration:2e3})):t.$message({title:"失败",message:"导入失败"+n.Message,type:"error",duration:2e3})})},handleDownUpload:function(){var e=window.PLATFROM_CONFIG.baseUrl+"/api/Stock/DoDownLoadTemp";window.open(e)},handlePtl:function(e){},GetWareHouseList:function(){var e=this;Object(i["o"])(this.chosedWareHouseCode).then(function(t){var n=JSON.parse(t.data.Content);e.WareHouseList=n})},batchOperate:function(e){switch(e){case"All_Export":this.All_ExportExcel();break;case"Condition_Export":this.Condition_ExportExcel();break}},Condition_ExportExcel:function(){var e=this;if(""===this.listQuery.MaterialCode&&""===this.listQuery.WareHouseCode&&""===this.listQuery.SupplierCode&&""===this.listQuery.begin&&""===this.listQuery.end)this.$confirm("您没有选择导出条件，将导出全部数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var e=window.PLATFROM_CONFIG.baseUrl+"/api/Stock/DoDownStockAge";window.open(e)}).catch(function(){e.$message({type:"info",message:"已取消"})});else{this.Value.length>0&&(this.listQuery.begin=this.Value[0],this.listQuery.end=this.Value[1]);var t=window.PLATFROM_CONFIG.baseUrl+"/api/Stock/DoDownStockAge?MaterialCode="+this.listQuery.MaterialCode+"&WareHouseCode="+this.listQuery.WareHouseCode+"&SupplierCode="+this.listQuery.SupplierCode+"&begin="+this.listQuery.begin+"&end="+this.listQuery.end;window.open(t)}},All_ExportExcel:function(){var e=this;this.$confirm("此操作将导出全部数据共"+this.total+"条，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var e=window.PLATFROM_CONFIG.baseUrl+"/api/Stock/DoDownStockAge";window.open(e)}).catch(function(){e.$message({type:"info",message:"已取消"})})},CheckedFun:function(e){this.checkBoxData=e},sortChange:function(e,t,n){this.listQuery.Sort=e.prop,"ascending"===e.order?this.listQuery.Order="asc":"descending"===e.order?this.listQuery.Order="desc":this.listQuery.Order=null,this.getList()},handleLight:function(){var e=this;this.checkBoxData.length>0?this.$confirm("确定点亮勾选的库存?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(i["d"])(e.checkBoxData).then(function(t){var n=JSON.parse(t.data.Content);n.Success?(e.dialogFormVisible=!1,e.$message({title:"成功",message:"点亮成功",type:"success",duration:2e3}),e.dialogFormSort=!1):e.$message({title:"失败",message:"点亮失败"+n.Message,type:"error",duration:5e3})})}):this.$message({title:"失败",message:"尚未勾选拣货单",type:"error",duration:5e3})},handleOffLight:function(){var e=this;this.$confirm("确定点亮勾选的库存?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(i["e"])(e.checkBoxData).then(function(t){var n=JSON.parse(t.data.Content);n.Success?(e.dialogFormVisible=!1,e.$message({title:"成功",message:"熄灭成功",type:"success",duration:2e3}),e.dialogFormSort=!1):e.$message({title:"失败",message:"熄灭失败"+n.Message,type:"error",duration:5e3})})})},handleShelfDwon:function(){var e=this;this.checkBoxData.length>0?this.$confirm("确定下架勾选的条码?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(i["a"])(e.checkBoxData).then(function(t){var n=JSON.parse(t.data.Content);n.Success?(e.dialogFormVisible=!1,e.$message({title:"成功",message:"直接下架条码成功",type:"success",duration:2e3}),e.dialogFormSort=!1,e.getList()):e.$message({title:"失败",message:"直接下架失败"+n.Message,type:"error",duration:5e3})})}):this.$message({title:"失败",message:"尚未勾选拣货单",type:"error",duration:5e3})}}},c=s,u=n("2877"),d=Object(u["a"])(c,o,a,!1,null,null,null);t["default"]=d.exports},d43b:function(e,t,n){"use strict";n.d(t,"m",function(){return a}),n.d(t,"n",function(){return i}),n.d(t,"p",function(){return r}),n.d(t,"j",function(){return l}),n.d(t,"d",function(){return s}),n.d(t,"e",function(){return c}),n.d(t,"a",function(){return u}),n.d(t,"o",function(){return d}),n.d(t,"f",function(){return p}),n.d(t,"g",function(){return f}),n.d(t,"l",function(){return h}),n.d(t,"k",function(){return g}),n.d(t,"h",function(){return m}),n.d(t,"i",function(){return y}),n.d(t,"b",function(){return v}),n.d(t,"c",function(){return w});var o=n("b775");function a(e){return Object(o["a"])({url:"api/Stock/GetPageRecords",method:"get",params:e})}function i(e){return Object(o["a"])({url:"api/Stock/GetStockLabel",method:"get",params:{code:e}})}function r(e){return Object(o["a"])({url:"api/Stock/DoUpLoadInInfo",method:"post",data:e})}function l(e){return Object(o["a"])({url:"api/Stock/GetMaterialPageRecords",method:"get",params:e})}function s(e){return Object(o["a"])({url:"api/Stock/LightStock",method:"post",data:e})}function c(){return Object(o["a"])({url:"api/Stock/OffLightStock",method:"post"})}function u(e){return Object(o["a"])({url:"api/Stock/DeleteStockArray",method:"post",data:e})}function d(){return Object(o["a"])({url:"api/MobileLocation/GetWareHouseList",method:"get"})}function p(e){return Object(o["a"])({url:"api/Dictionary/GetDictionaryByType",method:"get",params:{type:e}})}function f(e){return Object(o["a"])({url:"api/Stock/GetInactiveStockPageRecords",method:"get",params:e})}function h(e){return Object(o["a"])({url:"api/Stock/GetMaterialStatusPageRecords",method:"get",params:e})}function g(e){return Object(o["a"])({url:"api/Stock/GetMaterialStatusList",method:"get",params:{MaterialCode:e}})}function m(e){return Object(o["a"])({url:"api/Stock/GetInventoryStatusPageRecords",method:"get",params:e})}function y(e){return Object(o["a"])({url:"api/Stock/GetLocationStockByLayoutId",method:"get",params:{layoutId:e}})}function v(e){return Object(o["a"])({url:"api/Stock/DoDownLoadLabelStock",method:"get",params:e,responseType:"blob"})}function w(e){return Object(o["a"])({url:"api/Stock/DoDownLoadMaterialStock",method:"get",params:e,responseType:"blob"})}}}]);