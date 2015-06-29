var EmbedButton = require('./embed_button.jsx');
var EmbedPopup = require('./embed_popup.jsx');
var IIIFImage = require('./iiif_image.jsx');
var Link = ReactRouter.Link;

var ResultList = React.createClass({
  render: function() {
    if (this.props.results.length == 0) return null;
    var resultNodes = this.props.results.map(function (result) {
      return (
        <Result key={result.id} result={result} />
      );
    }.bind(this));
    return (
      <div className="results__wrapper">
        <div className="results__overlay"></div>
        <div className="results">
          {resultNodes}
        </div>
      </div>
    )
  }
});

var Result = React.createClass({
  getInitialState: function () {
    return {
      buttonClass: 'is_hidden',
      showPopup: false
    };
  },
  mouseOver: function () {
    this.setState({buttonClass: 'is_shown'});
  },
  mouseOut: function () {
    this.setState({buttonClass: 'is_hidden'});
  },
  click: function () {
    this.props.select(this.props.id);
  },
  togglePopup: function(e) {
    e.preventDefault();
    this.setState({showPopup: !this.state.showPopup});
  },
  render: function() {
    return (
      <div className="result" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        { this.state.showPopup ? <EmbedPopup id={this.props.result.fields.id} close={this.togglePopup} /> : null }
        <div className={this.state.buttonClass}>
          <EmbedButton togglePopup={this.togglePopup}/>
        </div>
        <Link to="detail" params={{id: this.props.result.fields.id}}>
          <IIIFImage server="http://iiifhawk.klokantech.com" id={this.props.result.fields.id} size="150,150" />
        </Link>
        <p className="result__description">{this.props.result.fields.title[0]}</p>
      </div>
    );
  }
});

module.exports = ResultList;
