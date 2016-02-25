(($, R) => {

	const App = R.createClass({
		getInitialState() {
			return {
				searchResults: []
			}
		},

		showResults(results) {
			this.setState({
				searchResults: results.query.pages
			})
		},

		search(SEARCH_STRING) {
			//const apiUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=test&gsrlimit=10&prop=pageimages|imageinfo|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max";

			$.ajax({
				type: "GET",
				
				// the URL to which the request is sent
				url: "https://en.wikipedia.org/w/api.php",
				// data to be sent to the server
				data: {
					action: 'query',
					format: 'json',
					generator: 'search',
					crossDomain: true,
					gsrnamespace: 0,
					// SEARCH_STRING comes from user input
					gsrsearch: SEARCH_STRING,
					gsrlimit: 10,
					prop: "pageimages|extracts",
					pilimit: "max",
					exintro: "",
					explaintext: "",
					exsentences: 1,
					exlimit: "max"
				},

				// The type of data that you're expecting back from the server
				dataType: 'jsonp',

				// Function to be called if the request succeeds
				success: (jsondata) => {
					this.showResults(jsondata)
				}
			});
		},

		render() {
			return ( <
				div >
				<
				SearchBox search = {
					this.search
				}
				/> <
				Results searchResults = {
					this.state.searchResults
				}
				/> < /
				div >
			)
		}
	})

	const Results = R.createClass({
		render() {
			var resultItem = Object.keys(this.props.searchResults).map((item, i) => {
				return <ResultItem key = {
					i
				}
				data = {
					this.props.searchResults[item]
				}
				/>
			});

			return ( <
				div >
				<
				ul className = "results" > {
					resultItem
				} <
				/ul> < /
				div >
			)
		}
	})

	const ResultItem = R.createClass({
		render() {
			return ( <
				li className = "resultsItem" >
				<
				a href = {
					"http://en.wikipedia.org/?curid=" + this.props.data.pageid
				}
				title = {
					this.props.data.title
				}
				target = "_blank" >
				<
				h3 className = "title" > {
					this.props.data.title
				} < /h3> <
				p className = "descr" > {
					this.props.data.extract
				} < /p> < /
				a > <
				/li>
			)
		}
	})

	const SearchBox = R.createClass({
		createAjaxReq(evt) {
			evt.preventDefault();

			// Take the value from user input
			var queryStr = ReactDOM.findDOMNode(this.refs.query).value;
			
			// Call the father search method
			this.props.search(queryStr);
		},

		render() {
			return ( <
				div >
				<
				h1 class = "main-title" > Just - a - Wiki < /h1>

				<
				div className = "commands" >
				<
				form onSubmit = {
					this.createAjaxReq
				} >
				<
				input placeholder = "Search..."
				id = "js-search"
				className = "query-input"
				type = "text"
				ref = "query" / >
				<
				input type = "submit"
				value = "Go"
				className = "btn query-btn" / >
				<
				/form>

				<
				strong className = "crossroads" > -OR - < /strong>

				<
				a href = "http://en.wikipedia.org/wiki/Special:Random"
				className = "btn lucky-btn"
				target = "_blank" > < strong > I 'm Feeling Lucky</strong></a> < /
				div > <
				/div>
			)
		}
	});

	ReactDOM.render( <
		App / > ,
		document.getElementById('app-init')
	)

})(jQuery, React);