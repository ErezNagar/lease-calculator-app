(this["webpackJsonplease-calculator-app"]=this["webpackJsonplease-calculator-app"]||[]).push([[0],{106:function(e,t,a){e.exports=a(194)},111:function(e,t,a){},194:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(31),s=a.n(r),i=a(16),c=a(7),o=a(8),m=a(14),u=a(13),h=a(15),f=(a(111),a(199)),d=a(198),p=a(204),g=a(205),E=a(103),k=function(e){var t=e.show,a=e.fadeInOnly,r=e.isInline,s=e.children,i=Object(n.useState)(t),c=Object(E.a)(i,2),o=c[0],m=c[1];Object(n.useEffect)((function(){t&&m(!0)}),[t]);return o&&l.a.createElement("div",{className:r?"fade-inline":null,style:{animation:t?"fadeIn ".concat("500ms"):a?"none":"fadeOut ".concat("500ms")},onAnimationEnd:function(){t||m(!1)}},s)};k.defaultProps={fadeInOnly:!1,isInline:!1};var y=k,C=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={value:0,isNextDisabled:!0,show:!0,usePercentRV:!0,isRVField:"rv"===a.props.fieldName,isMSRPField:"msrp"===a.props.fieldName,isDownPaymentField:"downPayment"===a.props.fieldName},a.handleChange=function(e){a.setState({value:e,isNextDisabled:a.state.isDownPaymentField?0===e.length:!e})},a.handleKeyUp=function(e){27===e.keyCode&&a.handleClickBack(),39===e.keyCode&&a.handleClickNext()},a.handleClickBack=function(){a.setState({show:!1},(function(){setTimeout((function(){a.props.onClickBack()}),500)}))},a.handleClickNext=function(){a.state.isNextDisabled&&!a.state.isDownPaymentField||a.setState({show:!1},(function(){setTimeout((function(){var e={field:a.props.fieldName,value:a.state.value};a.state.isRVField&&(e.isRVPercent=a.state.usePercentRV),a.props.onClickNext(e)}),500)}))},a.handleToggleRV=function(){a.setState({usePercentRV:!a.state.usePercentRV})},a.getPrefix=function(){return!a.state.isRVField||a.state.isRVField&&!a.state.usePercentRV?l.a.createElement("span",{style:{fontSize:"1.5em",marginRight:"10px"}},a.props.prefix):null},a.getSuffix=function(){return!a.state.isRVField||a.state.isRVField&&a.state.usePercentRV?l.a.createElement("span",{style:{fontSize:"1.5em",marginLeft:"10px"}},a.props.suffix):null},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"pageContainer"},l.a.createElement("div",{className:"section section--description flex-vertical-center"},l.a.createElement(y,{show:this.state.show},l.a.createElement("div",{className:"title"},this.props.title),l.a.createElement("div",{className:"description"},this.props.description))),l.a.createElement("div",{className:"section section--input"},l.a.createElement("div",{className:"sub-section-input flex-vertical-center"},l.a.createElement(y,{show:this.state.show},this.getPrefix(),l.a.createElement(f.a,{placeholder:this.props.placeholder,parser:this.props.parser,onChange:this.handleChange,onPressEnter:this.handleClickNext,onKeyUp:this.handleKeyUp,size:"large",type:"number",min:-1,autoFocus:!0}),this.getSuffix(),this.state.isRVField&&l.a.createElement("span",{className:"padding-left"},l.a.createElement(d.a,{type:"primary",size:"large",onClick:this.handleToggleRV},this.state.usePercentRV?"Use Value":"Use %")))),l.a.createElement("div",{className:"sub-section-navigation"},l.a.createElement("div",{className:"button-container button-left"},l.a.createElement(d.a,{type:"primary",onClick:this.handleClickBack,disabled:this.state.isMSRPField,size:"large"},l.a.createElement(p.a,null),"Back")),l.a.createElement("div",{className:"button-container button-right"},l.a.createElement(d.a,{type:"primary",onClick:this.handleClickNext,disabled:this.state.isNextDisabled,size:"large"},"Next",l.a.createElement(g.a,null))))))}}]),t}(l.a.Component);C.defaultProps={description:null,placeholder:0,prefix:"$",suffix:"",parser:function(e){return e.replace(/\$\s?|(,*)/g,"")},onClickNext:function(){},onClickBack:function(){}};var N=function(e){return l.a.createElement(C,{title:"MSRP",description:"Manufacturer Suggested Retail Price. No one really pays the full MSRP of a vehicle, don't be the one that does.",fieldName:"msrp",onClickNext:e.onClickNext})};N.defaultProps={onClickNext:function(){},onClickBack:function(){}};var x=N,v=function(e){return l.a.createElement(C,{title:"Selling Price",description:"The negotiated price of the vehicle, not including dealer rebates and manufacturer incentives. Aim for a minimum of 10% off MSRP.",fieldName:"sellingPrice",onClickNext:e.onClickNext,onClickBack:e.onClickBack})};v.defaultProps={onClickNext:function(){},onClickBack:function(){}};var b=v,P=function(e){return l.a.createElement(C,{title:"Months",description:"The length of the lease. More than 36 is less than ideal since usually the manufacturer warranty is for 3 years.",fieldName:"leaseTerm",placeholder:36,prefix:"",suffix:"",onClickNext:e.onClickNext,onClickBack:e.onClickBack})};P.defaultProps={onClickNext:function(){},onClickBack:function(){}};var w=P,S=a(206),T=function(e){var t=e.href;return l.a.createElement(d.a,{type:"link",target:"_blank",rel:"noopener noreferrer",href:t,className:"description-link"},"Read more",l.a.createElement(S.a,null))},M=function(e){return l.a.createElement(C,{title:"Money Factor",description:l.a.createElement(l.a.Fragment,null,l.a.createElement("span",null,"The interest rate on the deal. Same as APR, only using a decimel unit instead. The lower, the better."),l.a.createElement(T,{href:"http://bit.ly/LeaseMFRV"})),fieldName:"mf",placeholder:.00123,prefix:"",suffix:"",onClickNext:e.onClickNext,onClickBack:e.onClickBack})};M.defaultProps={onClickNext:function(){},onClickBack:function(){}};var R=M,O=function(e){return l.a.createElement(C,{title:"Residual Value",description:l.a.createElement(l.a.Fragment,null,l.a.createElement("span",null,"The value of the vehicle at the end of the lease. The higher, the better."),l.a.createElement(T,{href:"http://bit.ly/LeaseMFRV"})),fieldName:"rv",suffix:"%",onClickNext:e.onClickNext,onClickBack:e.onClickBack})};O.defaultProps={onClickNext:function(){},onClickBack:function(){}};var V=O,B=function(e){return l.a.createElement(C,{title:"Down Payment",description:l.a.createElement(l.a.Fragment,null,l.a.createElement("span",null,"Cash payment due at lease signing. Don't give away free money to the dealer. Never put a down payment."),l.a.createElement(T,{href:"http://bit.ly/LeaseDownPayment"})),fieldName:"downPayment",onClickNext:e.onClickNext,onClickBack:e.onClickBack})};B.defaultProps={onClickNext:function(){},onClickBack:function(){}};var F=B,j=function(e){return l.a.createElement(C,{title:"Rebates",description:"Total of dealer discounts and manufacturer incentives.",fieldName:"rebates",onClickNext:e.onClickNext,onClickBack:e.onClickBack})};j.defaultProps={onClickNext:function(){},onClickBack:function(){}};var D=j,L=function(e){return l.a.createElement(C,{title:"Fees",description:l.a.createElement(l.a.Fragment,null,l.a.createElement("span",null,"Total amount of fees: acquisition fee, dealer and government fees."),l.a.createElement(T,{href:"http://bit.ly/LeaseFees"})),fieldName:"totalFees",onClickNext:e.onClickNext,onClickBack:e.onClickBack})};L.defaultProps={onClickNext:function(){},onClickBack:function(){}};var z=L,I=function(e){return l.a.createElement(C,{title:"Sales Tax",description:"Your state's sales tax, if applicable.",fieldName:"salesTax",onClickNext:e.onClickNext,onClickBack:e.onClickBack,placeholder:6.25,prefix:"",suffix:"%",parser:function(e){return e.replace("%","")}})};I.defaultProps={onClickNext:function(){},onClickBack:function(){}};var $=I,A=a(93),U=a(195),_=a(200),K=a(202),W=a(196),Y=a(201),J=a(203),q=a(209),H=a(210),G=a(211),Q=a(212),X=a(94),Z=a.n(X),ee=a(207),te=a(208),ae=a(104),ne=function(e){var t=function(t){function a(){var e,t;Object(c.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(t=Object(m.a)(this,(e=Object(u.a)(a)).call.apply(e,[this].concat(l)))).state={shouldShowTooltip:!1},t.handleMouseEnter=function(){t.setState({shouldShowTooltip:!0})},t.handleMouseLeave=function(){t.setState({shouldShowTooltip:!1})},t}return Object(h.a)(a,t),Object(o.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var t=this.props,a=t.tooltipContent,n=t.cssClass,r=Object(ae.a)(t,["tooltipContent","cssClass"]);return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:this.state.shouldShowTooltip?"tooltip tooltip-".concat(n):"tooltip--hidden"},a),l.a.createElement(e,Object.assign({onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave},r)))}}]),a}(l.a.Component);return t.defaultProps={tooltipContent:null},t.displayName="WithTooltip(".concat(e.displayName||e.name,")"),t.WrappedComponent=e,t},le=function(e){var t=e.fieldText,a=e.isAboveThreshold,n=e.isError,r=e.onMouseEnter,s=e.onMouseLeave;return n?"-":l.a.createElement(l.a.Fragment,null,t,a?l.a.createElement(ee.a,{twoToneColor:"#52c41a",className:"threshold-icon",onMouseEnter:r,onMouseLeave:s,onClick:r}):l.a.createElement(te.a,{twoToneColor:"#eb2f96",className:"threshold-icon",onMouseEnter:r,onMouseLeave:s,onClick:r}))};le.defaultProps={isAboveThreshold:!1,isError:!1,onMouseEnter:function(){},onMouseLeave:function(){}};var re=ne(le),se=new A.a,ie=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(l)))).state={data:Object(i.a)({},a.props.data),results:{},isLoading:!1,isShowData:!0,isError:!1},a.calculateLease=function(e){try{se.calculate(e)}catch(n){return}var t=se.getMonthlyPaymentToMsrpPercentage(),a=se.getDiscountOffMsrpPercentage();return{msrpPercentage:t,offMsrp:a,RVValue:se.getRVValue(),RVPercent:se.getRVPercentage(),apr:se.getAPR(),totalCost:se.getTotalLeaseCost(),monthlyPaymentPreTax:se.getMonthlyPaymentPreTax(),monthlyPayment:se.getMonthlyPayment(),isMsrpPercentageThreshold:t<=1,isOffMsrpThreshold:a>=10}},a.handleChange=function(e,t){a.setState({isLoading:!0,isShowData:!1},(function(){a.debounce(e,t)}))},a.debounce=Z.a.debounce((function(e,t){var n=Object(i.a)({},a.state);n.data[t]=e,n.data.isRVPercent=!0,a.setState(n,(function(){var e=a.calculateLease(a.state.data);e?a.setState(Object(i.a)({},a.state,{results:Object(i.a)({},e),isShowData:!0,isLoading:!1,isError:!1})):a.setState({isError:!0,isLoading:!1})}))}),1e3),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this.calculateLease(this.props.data);this.setState({results:Object(i.a)({},e)})}},{key:"render",value:function(){var e=this;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"pageContainer"},this.state.isLoading&&l.a.createElement("div",{className:"spinner"},l.a.createElement(U.a,{indicator:l.a.createElement(q.a,null)})),l.a.createElement("div",{className:"section section--description results flex-vertical-center"},l.a.createElement("div",{className:"monthly-payment desktop"},l.a.createElement("div",{className:"title"},"Monthly Payment"),l.a.createElement(y,{show:this.state.isShowData,fadeInOnly:!0},l.a.createElement("div",{className:"description"},this.state.isError?l.a.createElement("span",{className:"input-error"},"-"):l.a.createElement(_.a,{value:this.state.results.monthlyPayment,precision:2,prefix:"$",valueStyle:{color:"white",fontSize:40}}),l.a.createElement("div",{style:{marginTop:"25px"}},this.state.isError?"Something went wrong. Please try again.":"Here's your monthly payment. You can change the lease numbers on the right to see how they affect the payment.")),l.a.createElement("div",{className:"footer desktop"},l.a.createElement("div",{className:"footer-disclaimer desktop"},"This calculator is in beta version. Use for estimation purposes only. Let us know of you find any discrepancies, thanks!"),l.a.createElement(K.a,{size:"medium"},l.a.createElement(W.a,{className:"divider"}),l.a.createElement(d.a,{className:"footer-icon desktop",type:"link",href:"https://github.com/ErezNagar/lease-calculator-app",target:"_blank",rel:"noopener noreferrer"},l.a.createElement(H.a,null)),l.a.createElement(d.a,{className:"footer-icon desktop",type:"link",href:"https://www.facebook.com/groups/1914738435321873",target:"_blank",rel:"noopener noreferrer"},l.a.createElement(G.a,null)),l.a.createElement(d.a,{className:"footer-icon desktop",type:"link",href:"mailto: erez.nagar@gmail.com",target:"_blank",rel:"noopener noreferrer"},l.a.createElement(Q.a,null)))))),l.a.createElement("div",{className:"monthly-payment mobile"},l.a.createElement("span",{className:"title"},"Monthly Payment:"),l.a.createElement(y,{show:this.state.isShowData,fadeInOnly:!0,isInline:!0},l.a.createElement("span",{className:"description"},this.state.isError?l.a.createElement("span",{className:"input-error"},"-"):l.a.createElement(_.a,{className:"inline",value:this.state.results.monthlyPayment,precision:2,prefix:"$",valueStyle:{color:"white",fontSize:20,fontWeight:"400"}}))))),l.a.createElement("div",{className:"section section--results"},l.a.createElement("div",{className:"interactive-desc mobile"},this.state.isError?"Something went wrong. Please try again.":"You can change the lease numbers below to see how they affect the payment"),l.a.createElement(Y.a,{gutter:[8,8],type:"flex",align:"middle"},l.a.createElement(J.a,{span:10,className:"text-align-right"},"MSRP:"),l.a.createElement(J.a,{className:"text-align-left"},l.a.createElement(f.a,{defaultValue:this.props.data.msrp,formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")},onChange:function(t){return e.handleChange(t,"msrp")},onPressEnter:this.handleClick,size:"large"}))),l.a.createElement(Y.a,{gutter:[8,0],type:"flex",align:"middle"},l.a.createElement(J.a,{span:10,className:"text-align-right"},"Selling Price:"),l.a.createElement(J.a,{span:10,className:"text-align-left"},l.a.createElement(f.a,{defaultValue:this.props.data.sellingPrice,formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")},onChange:function(t){return e.handleChange(t,"sellingPrice")},onPressEnter:this.handleClick,size:"large"}))),l.a.createElement(Y.a,{gutter:[16,16],type:"flex",align:"middle"},l.a.createElement(J.a,{span:10}),l.a.createElement(J.a,null,l.a.createElement(y,{show:this.state.isShowData,fadeInOnly:!0},l.a.createElement(re,{fieldText:"".concat(this.state.results.offMsrp,"% off MSRP"),tooltipContent:"Ideally, the negotiated selling price is at least 10% off of MSRP.",cssClass:"sellingPrice",isAboveThreshold:this.state.results.isOffMsrpThreshold,isError:this.state.isError})))),l.a.createElement(Y.a,{gutter:[8,8],type:"flex",align:"middle"},l.a.createElement(J.a,{span:10,className:"text-align-right"},"Months:"),l.a.createElement(J.a,{className:"text-align-left"},l.a.createElement(f.a,{defaultValue:this.props.data.leaseTerm,onChange:function(t){return e.handleChange(t,"leaseTerm")},onPressEnter:this.handleClick,size:"large"}))),l.a.createElement(Y.a,{gutter:[8,0],type:"flex",align:"middle"},l.a.createElement(J.a,{span:10,className:"text-align-right"},"Money Factor:"),l.a.createElement(J.a,{span:10,className:"text-align-left"},l.a.createElement(f.a,{defaultValue:this.props.data.mf,formatter:this.props.formatter,parser:this.props.parser,onChange:function(t){return e.handleChange(t,"mf")},onPressEnter:this.handleClick,size:"large"}))),l.a.createElement(Y.a,{gutter:[16,16],type:"flex",align:"middle"},l.a.createElement(J.a,{span:10}),l.a.createElement(J.a,null,l.a.createElement(y,{show:this.state.isShowData,fadeInOnly:!0},this.state.isError?"-":"".concat(this.state.results.apr,"% APR")))),l.a.createElement(Y.a,{gutter:[8,0],type:"flex",align:"middle"},l.a.createElement(J.a,{span:10,className:"text-align-right"},"Residual:"),l.a.createElement(J.a,{span:10,className:"text-align-left"},l.a.createElement(f.a,{value:this.state.results.RVPercent,formatter:function(e){return"".concat(e,"%")},parser:function(e){return e.replace("%","")},onChange:function(t){return e.handleChange(t,"rv")},onPressEnter:this.handleClick,size:"large"}))),l.a.createElement(Y.a,{gutter:[16,16],type:"flex",align:"middle"},l.a.createElement(J.a,{span:10}),l.a.createElement(J.a,null,l.a.createElement(y,{show:this.state.isShowData,fadeInOnly:!0},this.state.isError?"-":"$".concat(this.state.results.RVValue)))),l.a.createElement(Y.a,{gutter:[8,8],type:"flex",align:"middle"},l.a.createElement(J.a,{span:10,className:"text-align-right"},"Down Payment:"),l.a.createElement(J.a,{span:10,className:"text-align-left"},l.a.createElement(f.a,{defaultValue:this.props.data.downPayment,formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")},onChange:function(t){return e.handleChange(t,"downPayment")},onPressEnter:this.handleClick,size:"large"}))),l.a.createElement(Y.a,{gutter:[8,8],type:"flex",align:"middle"},l.a.createElement(J.a,{span:10,className:"text-align-right"},"Rebates:"),l.a.createElement(J.a,{className:"text-align-left"},l.a.createElement(f.a,{defaultValue:this.props.data.rebates,formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")},onChange:function(t){return e.handleChange(t,"rebates")},onPressEnter:this.handleClick,size:"large"}))),l.a.createElement(Y.a,{gutter:[8,8],type:"flex",align:"middle"},l.a.createElement(J.a,{span:10,className:"text-align-right"},"Fees:"),l.a.createElement(J.a,{className:"text-align-left"},l.a.createElement(f.a,{defaultValue:this.props.data.totalFees,formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")},onChange:function(t){return e.handleChange(t,"totalFees")},onPressEnter:this.handleClick,size:"large"}))),l.a.createElement(Y.a,{gutter:[8,8],type:"flex",align:"middle"},l.a.createElement(J.a,{span:10,className:"text-align-right"},"Sales Tax:"),l.a.createElement(J.a,{className:"text-align-left"},l.a.createElement(f.a,{defaultValue:this.props.data.salesTax,formatter:function(e){return"".concat(e,"%")},parser:function(e){return e.replace("%","")},onChange:function(t){return e.handleChange(t,"salesTax")},onPressEnter:this.handleClick,size:"large"}))),l.a.createElement(Y.a,{gutter:[8,8],type:"flex",align:"middle"},l.a.createElement(J.a,{span:10,className:"text-align-right"},"Monthly Pre-Tax:"),l.a.createElement(J.a,{className:"text-align-left"},l.a.createElement(y,{show:this.state.isShowData,fadeInOnly:!0},this.state.isError?l.a.createElement("span",{className:"input-error"},"-"):l.a.createElement(_.a,{value:this.state.results.monthlyPaymentPreTax,precision:2,prefix:"$"})))),l.a.createElement(Y.a,{gutter:[8,8],type:"flex",align:"middle"},l.a.createElement(J.a,{span:10,className:"text-align-right"},"% of MSRP:"),l.a.createElement(J.a,{className:"text-align-left"},l.a.createElement(y,{show:this.state.isShowData,fadeInOnly:!0,style:{width:"100%"}},l.a.createElement(re,{fieldText:"".concat(this.state.results.msrpPercentage,"%"),tooltipContent:"As a rule of thumb, a reasonable monthly payment for a good deal is 1% percent of MSRP.",cssClass:"msrpPercent",isAboveThreshold:this.state.results.isMsrpPercentageThreshold,isError:this.state.isError})))),l.a.createElement(Y.a,{gutter:[8,8],type:"flex",align:"middle"},l.a.createElement(J.a,{span:10,className:"text-align-right"},"Total Cost:"),l.a.createElement(J.a,{className:"text-align-left"},l.a.createElement(y,{show:this.state.isShowData,fadeInOnly:!0},this.state.isError?l.a.createElement("span",{className:"input-error"},"-"):l.a.createElement(_.a,{value:this.state.results.totalCost,precision:2,prefix:"$"}))))),l.a.createElement("div",{className:"footer mobile"},l.a.createElement("div",{className:"divider"},l.a.createElement(W.a,null)),l.a.createElement("div",{className:"footer-content"},l.a.createElement("div",{className:"footer-disclaimer mobile"},"This calculator is in beta version. Use for estimation purposes only. Let us know of you find any discrepancies, thanks!"),l.a.createElement(K.a,{size:"medium"},l.a.createElement(W.a,{className:"divider"}),l.a.createElement(d.a,{className:"footer-icon mobile",type:"link",href:"https://github.com/ErezNagar/lease-calculator-app",target:"_blank",rel:"noopener noreferrer"},l.a.createElement(H.a,null)),l.a.createElement(d.a,{className:"footer-icon mobile",type:"link",href:"https://www.facebook.com/groups/1914738435321873",target:"_blank",rel:"noopener noreferrer"},l.a.createElement(G.a,null)),l.a.createElement(d.a,{className:"footer-icon mobile",type:"link",href:"mailto: erez.nagar@gmail.com",target:"_blank",rel:"noopener noreferrer"},l.a.createElement(Q.a,null)))))))}}]),t}(l.a.Component);ie.defaultProps={data:{downPayment:0,rebates:0,totalFees:0,salesTax:0}};var ce=a(197),oe=[x,b,w,R,V,F,D,z,$],me=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(l)))).state={currentScreen:0,isLastScreen:!1,leaseData:{}},a.handleClickBack=function(){a.setState({currentScreen:a.state.currentScreen-1})},a.handleClickNext=function(e){var t=a.state.currentScreen,n=Object(i.a)({},a.state.leaseData);n[e.field]=e.value,"rv"===e.field&&(n.isRVPercent=e.isRVPercent);var l=t+1===oe.length;l||(t+=1),a.setState({leaseData:n,isLastScreen:l,currentScreen:t})},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=oe[this.state.currentScreen];return this.state.isLastScreen?l.a.createElement(ie,{data:this.state.leaseData}):l.a.createElement(l.a.Fragment,null,l.a.createElement(ce.a,{percent:this.state.currentScreen/oe.length*100,showInfo:!1,size:"small",className:"progress"}),l.a.createElement(e,{progress:this.state.currentScreen/oe.length,onClickNext:this.handleClickNext,onClickBack:this.handleClickBack}))}}]),t}(l.a.Component);s.a.render(l.a.createElement(me,null),document.getElementById("root"))}},[[106,1,2]]]);
//# sourceMappingURL=main.5e89cc51.chunk.js.map