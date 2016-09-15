var fs = require('fs');


var File = React.createClass({displayName: 'File',
  render: function() {
    return (
      <tr><td></td><td>{this.props.name}</td></tr>
    );
  }
});

var renderDirEntry = function(path, file) {
  if(fs.statSync(path + '/' + file).isDirectory()) {
    return <Dir path={path + '/' + file} name={file}/>;
  } else {
    return <File path={path + '/' + file} name={file}/>;
  }
} 

var expanderStyle = {
  "verticalAlign": "text-top",
}; 
var Dir = React.createClass({displayName: 'Dir',
  render: function() { 
    return (<tr>
      <td onClick={this.changeState} style={expanderStyle}>{this.state.expanded ? '-' : '+'}</td>
      <td className="dir">{this.props.name}
      <div><table>{
        this.state.expanded
          ?this.state.content.map((file) => renderDirEntry(this.props.path, file))
          :[]
      }</table></div></td>
    </tr>);
  },
  getInitialState: function() {
    return {
      expanded: false,
      content: [],
    }
  },
  changeState: function() {
    if(!this.state.expanded) {
      fs.readdir(this.props.path, (err, files) => {
        console.log(files);
        this.setState({content: files});
      })      
    }
    this.setState({expanded: !this.state.expanded});
  }
})


var FileManager = React.createClass({displayName: "FileManager",
  render: function() { 
    return (
    <div>
      <h1>Content of {this.props.path}</h1>
      <table><Dir path={this.props.path} name="root"/></table>
    </div>); 
  }
});


ReactDOM.render(
  <FileManager path="."/>,
  document.getElementById('example')
);
