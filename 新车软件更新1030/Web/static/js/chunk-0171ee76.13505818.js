(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0171ee76"],{"584c":function(e,t,a){"use strict";a.d(t,"e",function(){return i}),a.d(t,"a",function(){return r}),a.d(t,"c",function(){return o}),a.d(t,"b",function(){return l}),a.d(t,"d",function(){return s});var n=a("b775");function i(e){return Object(n["a"])({url:"api/Department/GetList",method:"get",params:e})}function r(e){return Object(n["a"])({url:"api/Department/PostDoCreate",method:"post",data:e})}function o(e){return Object(n["a"])({url:"api/Department/PostDoEdit",method:"post",data:e})}function l(e){return Object(n["a"])({url:"api/Department/PostDoRemove",method:"post",data:e})}function s(){return Object(n["a"])({url:"api/Department/GetDepartmentTreeData",method:"get"})}},"5c83":function(e,t,a){"use strict";a("a481"),a("6762"),a("2fdb");var n={bind:function(e,t,a){var n=e.querySelector(".el-dialog__header"),i=e.querySelector(".el-dialog");n.style.cssText+=";cursor:move;",i.style.cssText+=";top:0px;";var r=function(){return window.document.currentStyle?function(e,t){return e.currentStyle[t]}:function(e,t){return getComputedStyle(e,!1)[t]}}();n.onmousedown=function(e){var t=e.clientX-n.offsetLeft,o=e.clientY-n.offsetTop,l=i.offsetWidth,s=i.offsetHeight,c=document.body.clientWidth,d=document.body.clientHeight,u=i.offsetLeft,p=c-i.offsetLeft-l,m=i.offsetTop,h=d-i.offsetTop-s,f=r(i,"left"),g=r(i,"top");f.includes("%")?(f=+document.body.clientWidth*(+f.replace(/\%/g,"")/100),g=+document.body.clientHeight*(+g.replace(/\%/g,"")/100)):(f=+f.replace(/\px/g,""),g=+g.replace(/\px/g,"")),document.onmousemove=function(e){var n=e.clientX-t,r=e.clientY-o;-n>u?n=-u:n>p&&(n=p),-r>m?r=-m:r>h&&(r=h),i.style.cssText+=";left:".concat(n+f,"px;top:").concat(r+g,"px;"),a.child.$emit("dragDialog")},document.onmouseup=function(e){document.onmousemove=null,document.onmouseup=null}}}},i=function(e){e.directive("el-drag-dialog",n)};window.Vue&&(window["el-drag-dialog"]=n,Vue.use(i)),n.install=i;t["a"]=n},6724:function(e,t,a){"use strict";a("8d41");var n="@@wavesContext";function i(e,t){function a(a){var n=Object.assign({},t.value),i=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),r=i.ele;if(r){r.style.position="relative",r.style.overflow="hidden";var o=r.getBoundingClientRect(),l=r.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":(l=document.createElement("span"),l.className="waves-ripple",l.style.height=l.style.width=Math.max(o.width,o.height)+"px",r.appendChild(l)),i.type){case"center":l.style.top=o.height/2-l.offsetHeight/2+"px",l.style.left=o.width/2-l.offsetWidth/2+"px";break;default:l.style.top=(a.pageY-o.top-l.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",l.style.left=(a.pageX-o.left-l.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return l.style.backgroundColor=i.color,l.className="waves-ripple z-active",!1}}return e[n]?e[n].removeHandle=a:e[n]={removeHandle:a},a}var r={bind:function(e,t){e.addEventListener("click",i(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[n].removeHandle,!1),e.addEventListener("click",i(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[n].removeHandle,!1),e[n]=null,delete e[n]}},o=function(e){e.directive("waves",r)};window.Vue&&(window.waves=r,Vue.use(o)),r.install=o;t["a"]=r},"6c46":function(e,t,a){},"8ad4":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-table",e._g(e._b({attrs:{data:e.tableData,"row-style":e.showRow}},"el-table",e.$attrs,!1),e.$listeners),[e._t("selection"),e._v(" "),e._t("pre-column"),e._v(" "),e._l(e.columns,function(t){return a("el-table-column",{key:t.key,attrs:{label:t.label,width:t.width,align:t.align||"center","header-align":t.headerAlign},scopedSlots:e._u([{key:"default",fn:function(n){return[e._t(t.key,[t.expand?[a("span",{style:{"padding-left":+n.row._level*e.indent+"px"}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.showSperadIcon(n.row),expression:"showSperadIcon(scope.row)"}],staticClass:"tree-ctrl",on:{click:function(t){return e.toggleExpanded(n.$index)}}},[n.row._expand?a("i",{staticClass:"el-icon-minus"}):a("i",{staticClass:"el-icon-plus"})])]:e._e(),e._v(" "),t.checkbox?[n.row[e.defaultChildren]&&n.row[e.defaultChildren].length>0?a("el-checkbox",{style:{"padding-left":+n.row._level*e.indent+"px"},attrs:{indeterminate:n.row._select},on:{change:function(t){return e.handleCheckAllChange(n.row)}},model:{value:n.row._select,callback:function(t){e.$set(n.row,"_select",t)},expression:"scope.row._select"}}):a("el-checkbox",{style:{"padding-left":+n.row._level*e.indent+"px"},on:{change:function(t){return e.handleCheckAllChange(n.row)}},model:{value:n.row._select,callback:function(t){e.$set(n.row,"_select",t)},expression:"scope.row._select"}})]:e._e(),e._v("\n        "+e._s(n.row[t.key])+"\n      ")],{scope:n})]}}],null,!0)})})],2)},i=[],r=(a("28a5"),a("c5f6"),{name:"TreeTable",props:{data:{type:Array,required:!0,default:function(){return[]}},columns:{type:Array,default:function(){return[]}},defaultExpandAll:{type:Boolean,default:!0},defaultChildren:{type:String,default:"children"},indent:{type:Number,default:50}},data:function(){return{guard:1}},computed:{children:function(){return this.defaultChildren},tableData:function(){var e=this.data;return 0===this.data.length?[]:e}},methods:{addBrother:function(e,t){e._parent?e._parent.children.push(t):this.data.push(t)},addChild:function(e,t){e.children||this.$set(e,"children",[]),e.children.push(t)},delete:function(e){var t=e._index,a=e._parent;a?a.children.splice(t,1):this.data.splice(t,1)},getData:function(){return this.tableData},showRow:function(e){var t=e.row,a=t._parent,n=!a||a._expand&&a._show;return t._show=n,n?"animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;":"display:none;"},showSperadIcon:function(e){return e[this.children]&&e[this.children].length>0},toggleExpanded:function(e){var t=this.tableData[e],a=!t._expand;t._expand=a},handleCheckAllChange:function(e){this.selcetRecursion(e,e._select,this.defaultChildren),this.isIndeterminate=e._select},selcetRecursion:function(e,t){var a=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"children";t&&(this.$set(e,"_expand",!0),this.$set(e,"_show",!0));var i=e[n];i&&i.length>0&&i.map(function(e){e._select=t,a.selcetRecursion(e,t,n)})},updateTreeNode:function(e){var t=this;return new Promise(function(a){var n=e._id,i=e._parent,r=n.split("-").slice(-1)[0];i?(i.children.splice(r,1,e),a(t.data)):(t.data.splice(r,1,e),a(t.data))})}}}),o=r,l=(a("c7b6"),a("2877")),s=Object(l["a"])(o,n,i,!1,null,null,null);t["a"]=s.exports},"8d41":function(e,t,a){},be78:function(e,t,a){},c7b6:function(e,t,a){"use strict";var n=a("be78"),i=a.n(n);i.a},e644:function(e,t,a){"use strict";var n=a("6c46"),i=a.n(n);i.a},edbf:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-card",{staticClass:"search-card"},[a("div",{staticClass:"filter-container"},[a("el-button",{staticClass:"filter-button",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:function(t){return e.handleCreate("")}}},[e._v("添加")])],1)]),e._v(" "),a("el-card",[a("tree-table",{key:1,attrs:{data:e.tableData,columns:e.columns,"default-expand-all":!1,"header-cell-style":{background:"#F5F7FA"},border:"","row-key":"Id","highlight-current-row":""},scopedSlots:e._u([{key:"operation",fn:function(t){var n=t.scope;return[""===n.row.ParentCode||null===n.row.ParentCode?a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.handleCreate(n.row.Code)}}},[e._v("添加")]):e._e(),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.handleUpdate(n.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.handleDelete(n.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("el-dialog",{directives:[{name:"el-drag-dialog",rawName:"v-el-drag-dialog"}],attrs:{visible:e.dialogFormVisible,width:"30%","close-on-click-modal":!1,title:e.textMap[e.dialogStatus]},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"dataForm",staticClass:"page-form",attrs:{model:e.Department,rules:e.rules,"status-icon":"","label-width":"100px","label-position":"right"}},[a("el-form-item",{staticClass:"item",attrs:{label:"部门编码:",prop:"Code"}},[a("el-input",{staticClass:"dialog-input",attrs:{placeholder:"请输入部门编码",disabled:"update"===e.dialogStatus},model:{value:e.Department.Code,callback:function(t){e.$set(e.Department,"Code",t)},expression:"Department.Code"}})],1),e._v(" "),a("el-form-item",{staticClass:"item",attrs:{label:"部门名称:",prop:"Name"}},[a("el-input",{staticClass:"dialog-input",attrs:{placeholder:"请输入部门名称"},model:{value:e.Department.Name,callback:function(t){e.$set(e.Department,"Name",t)},expression:"Department.Name"}})],1),e._v(" "),a("el-form-item",{staticClass:"item",attrs:{label:"上级编码:"}},[a("el-input",{staticClass:"dialog-input",attrs:{placeholder:"请输入上级编码"},model:{value:e.Department.ParentCode,callback:function(t){e.$set(e.Department,"ParentCode",t)},expression:"Department.ParentCode"}})],1),e._v(" "),a("el-form-item",{staticClass:"item",attrs:{label:"负责人:"}},[a("el-input",{staticClass:"dialog-input",attrs:{placeholder:"请输入负责人姓名"},model:{value:e.Department.Manager,callback:function(t){e.$set(e.Department,"Manager",t)},expression:"Department.Manager"}})],1),e._v(" "),a("el-form-item",{staticClass:"item",attrs:{label:"具体描述:"}},[a("el-input",{staticClass:"dialog-input",attrs:{autosize:{minRows:2,maxRows:4},type:"textarea",placeholder:"备注信息"},model:{value:e.Department.Remark,callback:function(t){e.$set(e.Department,"Remark",t)},expression:"Department.Remark"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取消")]),e._v(" "),"create"==e.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:e.createDepartment}},[e._v("确认")]):a("el-button",{attrs:{type:"primary"},on:{click:e.updateDepartment}},[e._v("确认")])],1)],1)],1)},i=[],r=a("8237"),o=a.n(r),l=a("6724"),s=a("5c83"),c=a("584c"),d=a("8ad4"),u={name:"Department",components:{treeTable:d["a"]},directives:{elDragDialog:s["a"],waves:l["a"]},data:function(){return{tableKey:0,list:null,tableData:"",total:null,listLoading:!0,listQuery:{Page:1,Rows:12,Name:void 0,type:void 0,Sort:"id"},isChangePassword:!1,Department:{Id:void 0,Code:"",Name:"",Manager:"",ParentCode:"",Remark:""},roleList:[],rules:{Code:[{required:!0,message:"请输入部门编码",trigger:"blur"}],Name:[{required:!0,message:"请输入部门名称",trigger:"blur"}]},dialogTreeVisible:!1,moduleAuthData:[1],treeProps:{label:"Name",children:"children"},treeData:[],ModuleAuths:{arr:[],typeCode:"",type:1},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑部门",create:"创建部门"},src:"/logo.png",faceUrl:"/logo.png",uploadFileLibrary:window.PLATFROM_CONFIG.baseUrl+"/api/FileLibrary/PostDoFaceLibraryUpload",BaseUrl:window.PLATFROM_CONFIG.baseUrl,columns:[{label:"部门编码",width:200,key:"Code",align:"left"},{label:"部门名称",key:"Name",width:200},{label:"部门负责人",key:"Manager"},{label:"上级编码",width:100,key:"ParentCode"},{label:"操作",width:280,key:"operation"}]}},watch:{dialogFormVisible:function(e){e||this.resetDepartment()},dialogTreeVisible:function(e){e||this.resetDepartment()}},created:function(){this.initData()},methods:{initData:function(){this.getList()},getList:function(){var e=this;this.listLoading=!0,Object(c["e"])(this.listQuery).then(function(t){var a=JSON.parse(t.data.Content);console.log(a),e.tableData=a,setTimeout(function(){e.listLoading=!1},1e3)})},handleFilter:function(){this.listQuery.Page=1,this.getList()},handleSizeChange:function(e){this.listQuery.Rows=e,this.getList()},handleCurrentChange:function(e){this.listQuery.Page=e,this.getList()},handleCreate:function(e){var t=this;this.Department.ParentCode=e,this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs["dataForm"].clearValidate()})},createDepartment:function(){var e=this;this.$refs["dataForm"].validate(function(t){t&&Object(c["a"])(e.Department).then(function(t){var a=JSON.parse(t.data.Content);a.Success?(e.$message({title:"成功",message:"部门创建成功",type:"success",duration:2e3}),e.getList(),e.dialogFormVisible=!1):e.$message({title:"失败",message:"部门创建失败："+a.Message,type:"error",duration:2e3})})})},handleUpdate:function(e){var t=this,a=Object.assign({},e);this.Department=a,this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs["dataForm"].clearValidate()})},updateDepartment:function(){var e=this;this.$refs["dataForm"].validate(function(t){t&&(e.isChangePassword&&(e.Department.Password=o()(e.Department.Password)),e.Department.Roles=JSON.stringify(e.Department.Roles),Object(c["c"])(e.Department).then(function(t){var a=JSON.parse(t.data.Content);a.Success?(e.$message({title:"成功",message:"部门编辑成功",type:"success",duration:2e3}),e.getList(),e.dialogFormVisible=!1):e.$message({title:"失败",message:"部门编辑失败："+a.Message,type:"error",duration:2e3})}))})},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该部门, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.Department=Object.assign({},e),t.deleteData(t.Department)}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},deleteData:function(e){var t=this;Object(c["b"])(e).then(function(e){var a=JSON.parse(e.data.Content);a.Success?(t.$message({title:"成功",message:"删除成功",type:"success",duration:2e3}),t.getList()):t.$message({title:"成功",message:"删除失败："+a.Message,type:"error",duration:2e3})})},resetDepartment:function(){this.Department={Id:void 0,Code:"",Name:"",Password:"123456",checkPass:"123456",Sex:"1",Mobilephone:"",Roles:[],WeXin:"",Remark:"",Header:window.PLATFROM_CONFIG.baseUrl+"/Assets/images/3.png",Enabled:!0},this.moduleAuthData=[],this.treeData=[]}}},p=u,m=(a("e644"),a("2877")),h=Object(m["a"])(p,n,i,!1,null,"3948ae34",null);t["default"]=h.exports}}]);