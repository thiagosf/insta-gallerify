(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,a){e.exports=a(48)},22:function(e,t,a){},25:function(e,t,a){},26:function(e,t,a){},42:function(e,t,a){},44:function(e,t,a){},45:function(e,t,a){},46:function(e,t,a){},47:function(e,t,a){},48:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(9),s=a.n(i),o=(a(22),a(23),a(24),a(11)),l=a(1),c=a(2),u=a(4),m=a(3),f=a(5),h=(a(25),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={username:"",valid:!1,fullscreen:!1},a._handleKey=function(e){"Enter"===e.key&&a._setValid()},a._handleBlur=function(){a.state.username&&a._setValid()},a._handleChange=function(e){a.setState({username:e.target.value.trim()})},a._setValid=function(){var e=""!==a.state.username;a.setState({valid:e},function(){a.props.onSetUsername(a.state.username)})},a._edit=function(){a.setState({valid:!1},function(){a.input.select()})},a._toggleFullScreen=function(){a.setState({fullscreen:!a.state.fullscreen},function(){a.state.fullscreen?document.body.requestFullscreen():document.exitFullscreen()})},a}return Object(f.a)(t,e),Object(c.a)(t,[{key:"componentDidUpdate",value:function(e){var t=this,a=this.props.username;a!==e.username&&this.setState({username:a},function(){t._setValid()})}},{key:"render",value:function(){var e=this,t=this.state,a=t.username,n=t.valid;return r.a.createElement("header",{className:"main-header"},r.a.createElement("span",{className:"main-header__fullscreen",onClick:this._toggleFullScreen},r.a.createElement("span",{role:"img","aria-label":"eyeglasses"},"\ud83d\udc53")),n&&r.a.createElement("div",{className:"main-header__user",onClick:this._edit},r.a.createElement("p",{className:"main-header__user__name"},a)),!n&&r.a.createElement("input",{autoFocus:!0,name:"username",className:"main-header__input",ref:function(t){return e.input=t},type:"text",value:a,placeholder:"@username",onChange:this._handleChange,onKeyPress:this._handleKey,onBlur:this._handleBlur}))}}]),t}(n.Component)),_=(a(26),function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("footer",{className:"main-footer"},r.a.createElement("a",{className:"main-footer__link",href:"https://github.com/thiagosf/insta-gallerify"},"github"))}}]),t}(n.Component)),p=a(14),g=a.n(p),d=a(15),v=a.n(d),b=(a(42),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r))))._friendlyLikes=function(){var e=a.props.likes;return e>1e3?v()(e).format("0.0a"):e},a._getLink=function(){var e=a.props.shortcode;return"https://www.instagram.com/p/".concat(e)},a._getDate=function(){var e=a.props.timestamp;return new Date(1e3*+e).toLocaleString()},a._getFavoriteClasses=function(){var e=["photo__info__favorite"];return a.props.favorite&&e.push("photo__info__favorite--active"),e.join(" ")},a._toggleFavorite=function(){a.props.onFavorite({url:a.props.url,shortcode:a.props.shortcode,timestamp:a.props.timestamp,likes:a.props.likes})},a}return Object(f.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.url;return r.a.createElement("div",{className:"photo"},r.a.createElement("div",{className:"photo__info"},r.a.createElement("div",{className:"photo__info__vertical-group"},r.a.createElement("span",{className:this._getFavoriteClasses(),onClick:this._toggleFavorite},r.a.createElement("span",{className:"photo__info__favorite__icon",role:"img","aria-label":"star"},"\u2b50\ufe0f")),r.a.createElement("span",{className:"photo__info__likes"},r.a.createElement("span",{className:"photo__info__likes__icon",role:"img","aria-label":"heart"},"\u2764\ufe0f")," ",this._friendlyLikes())),r.a.createElement("span",{className:"photo__info__timestamp"},this._getDate()),r.a.createElement("a",{href:this._getLink(),target:"_blank",rel:"noopener noreferrer",className:"photo__info__link"},"link")),r.a.createElement("img",{src:e,alt:""}))}}]),t}(n.Component));b.defaultProps={url:"",shortcode:"",timestamp:"",likes:0,favorite:!1,onFavorite:function(){}};var y=b,k={fetchUser:function(e){var t="https://www.instagram.com/".concat(e,"/?__a=1");return fetch(t).then(function(e){return e.json()}).then(function(e){var t=[],a=[];if(e.graphql){var n=e.graphql.user.id,r=e.graphql.user.edge_owner_to_timeline_media,i=r.edges,s=r.count,o=e.graphql.user.edge_owner_to_timeline_media.page_info.has_next_page,l=e.graphql.user.edge_owner_to_timeline_media.page_info.end_cursor,c=e.graphql.user.is_private;if(s>0&&!c&&(a=i.map(function(e){return{url:e.node.display_url,shortcode:e.node.shortcode,timestamp:e.node.taken_at_timestamp,likes:+e.node.edge_liked_by.count}})),o){var u=1;t.push(function e(t){var r={query_hash:"f2405b236d85e8296cf30347c9f08c2a",variables:'{"id":"'.concat(n,'","first":').concat(50,',"after":"').concat(t,'"}')},i="https://www.instagram.com/graphql/query?query_hash=".concat(r.query_hash,"&variables=").concat(r.variables);return fetch(i).then(function(e){return e.json()}).then(function(t){if("ok"===t.status){var n=t.data.user.edge_owner_to_timeline_media.edges,r=t.data.user.edge_owner_to_timeline_media.page_info.has_next_page,i=t.data.user.edge_owner_to_timeline_media.page_info.end_cursor;if(n.forEach(function(e){a.push({url:e.node.display_url,shortcode:e.node.shortcode,timestamp:e.node.taken_at_timestamp,likes:+e.node.edge_media_preview_like.count})}),u++,r&&u<20)return e(i)}}).catch(function(e){console.log("pagination error:",e)})}(l))}}if(0===a.length)throw new Error("User not found or private");return Promise.all(t).then(function(){return a})}).catch(function(e){throw new Error("User not found or private")})}},E=a(16),j=a.n(E),w={filterImages:function(e){var t=e.images,a=e.sort,n=e.limit,r=[].concat(t);return"likes"===a?r=j.a.sortBy(r,"likes").reverse():"oldest"===a&&(r=r.reverse()),n>0&&(r=r.slice(0,n)),r},toggleFavorite:function(e){var t=this.getFavorites();t.find(function(t){return t.url===e.url})?t=t.filter(function(t){return t.url!==e.url}):t.push(e),t=JSON.stringify(t),localStorage.setItem("favorites",t)},isFavorite:function(e){return void 0!==this.getFavorites().find(function(t){return t.url===e.url})},getFavorites:function(){var e=localStorage.getItem("favorites");return e=e?JSON.parse(e):[]}},O=(a(44),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r))))._onFavorite=function(e){w.toggleFavorite(e),a.props.onFavorite(e)},a}return Object(f.a)(t,e),Object(c.a)(t,[{key:"componentDidUpdate",value:function(e){this.props.images.length===e.images.length&&this.props.filters===e.filters||this.slider&&this.slider.slickGoTo(0)}},{key:"render",value:function(){var e=this,t=this.props.images;if(0===t.length)return!1;var a=t.map(function(t,a){return r.a.createElement(y,{key:a,url:t.url,shortcode:t.shortcode,timestamp:t.timestamp,favorite:t.favorite,likes:t.likes,onFavorite:e._onFavorite})});return r.a.createElement(g.a,Object.assign({ref:function(t){return e.slider=t}},{dots:!1,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,variableWidth:!1,accessibility:!0,lazyLoad:"ondemand"}),a)}}]),t}(n.Component));O.defaultProps={filters:{},images:[],onFavorite:function(){}};var F=O,S=a(10),C=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(i))))._getItems=function(){var e=a.props,t=e.values,n=e.selected;return t.map(function(e,t){var i=["gallery-filters__filter__value"];return e.value===n&&i.push("gallery-filters__filter__value--active"),r.a.createElement("span",{key:t,className:i.join(" "),onClick:function(){return a.props.onChange(e.value)}},e.label)})},a}return Object(f.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"gallery-filters__filter"},this._getItems())}}]),t}(n.Component);C.defaultProps={onChange:function(){},selected:null,values:[]};var N=C,U=(a(45),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(i)))).state={sort:"recent",limit:50},a._getSortFilters=function(){var e=a.state.sort;return r.a.createElement(N,{selected:e,values:[{value:"likes",label:"likes"},{value:"recent",label:"recent"},{value:"oldest",label:"oldest"}],onChange:function(e){return a._onChangeFilter("sort",e)}})},a._getLimitFilters=function(){var e=a.state.limit;return r.a.createElement(N,{selected:e,values:[{value:10,label:10},{value:50,label:50},{value:0,label:"all"}],onChange:function(e){return a._onChangeFilter("limit",e)}})},a._onChangeFilter=function(e,t){a.setState(Object(S.a)({},e,t),function(){a.props.onChange(a.state)})},a}return Object(f.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"gallery-filters"},this._getSortFilters(),this._getLimitFilters())}}]),t}(n.Component));U.defaultProps={onChange:function(){},filters:{}};var I=U,q=(a(46),function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"spinner"},r.a.createElement("span",{className:"spinner__circle"}))}}]),t}(n.Component)),x=(a(47),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(i)))).state={username:null,images:[],filters:{},favorites:[],showThumbs:!1,loading:!1,error:null,exampleUsers:["angrymikko","jaromvogel","zatransis","rebeccamillsdraws","\u2b50\ufe0f"]},a._onSetUsername=function(e){if(e)if("\u2b50\ufe0f"===e||"favorites"===e){window.history.pushState({},"username_favorites","#/@favorites"),document.title="favorites / Insta Gallerify";var t=w.getFavorites();t.length>0?a.setState({username:e,images:t}):a.setState({error:"You have no favorites yet!",username:"",images:[]})}else window.history.pushState({},"username_".concat(e),"#/@".concat(e)),document.title="@".concat(e," / Insta Gallerify"),e!==a.state.username&&a.setState({loading:!0},function(){return k.fetchUser(e).then(function(t){a.setState({username:e,images:t})}).catch(function(e){a.setState({error:e.message,username:"",images:[]})}).finally(function(){a.setState({loading:!1})})});else a.setState({username:"",images:[]})},a._galleryImages=function(){var e=[],t=a.state,n=t.images,r=t.filters;return n.length>0&&(e=w.filterImages(Object(o.a)({images:n},r))),e=e.map(function(e){return Object(o.a)({},e,{favorite:w.isFavorite(e)})})},a._onFilter=function(e){a.setState({filters:e})},a._getExampleUsers=function(){return a.state.exampleUsers.map(function(e,t){return r.a.createElement("li",{key:t},r.a.createElement("span",{onClick:function(){return a._onSetUsername(e)}},e))})},a._checkUsernameInHash=function(e){var t=e.split("@");t.length>0&&a._onSetUsername(t[1])},a._onHashChange=function(e){a._checkUsernameInHash(e.newURL)},a._onFavorite=function(e){var t=a.state.images.map(function(t){return t.url===e.url&&(t.favorite=!t.favorite),t});a.setState({images:t})},a}return Object(f.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){window.location.hash&&this._checkUsernameInHash(window.location.hash),window.addEventListener("hashchange",this._onHashChange)}},{key:"render",value:function(){var e=this.state,t=e.username,a=e.images,n=e.loading,i=e.error;return r.a.createElement("div",{className:"app"},r.a.createElement(h,{username:t,onSetUsername:this._onSetUsername}),a.length>0&&!n&&r.a.createElement(I,{filters:this.state.filters,onChange:this._onFilter}),!n&&r.a.createElement(F,{filters:this.state.filters,images:this._galleryImages(),onFavorite:this._onFavorite}),n&&r.a.createElement(q,null),0===a.length&&!n&&r.a.createElement("div",{className:"app__start"},i&&r.a.createElement("p",{className:"app__start__error"},i),r.a.createElement("p",{className:"app__start__message"},"Fill the username ",r.a.createElement("span",{role:"img","aria-label":"point_up"},"\u261d\ufe0f")),r.a.createElement("p",{className:"app__start__example"},"Examples:"),r.a.createElement("ul",{className:"app__start__example-users"},this._getExampleUsers())),r.a.createElement(_,null))}}]),t}(n.Component));s.a.render(r.a.createElement(x,null),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.7cc5e24a.chunk.js.map