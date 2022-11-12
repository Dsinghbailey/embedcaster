// Cast CSS as text
var styles = `
/* Cast css */
.embedded_cast {
  background-color: #23272D;
  max-width: 600px;
  padding: 16px 4px;
  text-align:left;
  border: #2E333A 1px solid; 
  display: flex;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.embedded_cast__avatar {
  border-radius: 100%;
  width: 56px;
  height: 56px;
  padding: 0px 8px;
}
.embedded_cast__top{
  display: flex;
  margin-bottom: 8px;
}
.embedded_cast__h1{
  color: #b8c1ca;
  font-weight: 700;
  font-size: 18px;
  padding-right:4px;
}
.embedded_cast__h2{
  color: #8E99A3;
  font-weight: 400;
  font-size: 18px;
}

.embedded_cast__p {
  color: #b8c1ca;
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 16px;
}
.embedded_cast__link {
  color: #8a63d2;
  font-size: 16px;
  text-decoration: none;
}
`

var styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)