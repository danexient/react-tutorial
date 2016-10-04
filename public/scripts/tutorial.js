var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function() {
    // TODO: submit to the server and refresh the list
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="CommentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        <CommentForm />
        <div><Button1 /></div>
        <Testing />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Type a comment..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var Comment = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

var data = [
  {id: 1, author: "Jim Bob", text: "This is a comment"},
  {id: 2, author: "Some Guy", text: "This is a differect comment"}
];

var Button1 = React.createClass({
  render: function() {
    const a = [0,1]
    const b = [0,2]
    const c = a.concat(b)

    const apples = [
    { type: 'Red Delicious' },
    { type: 'Golden Delicious' },
    { type: 'Golden Delicious' },
    { type: 'Red Delicious' }
    ]
    const redApples = apples.filter(
      apple => apple.type === 'Red Delicious'
    )

    const square = n => n*n
    const plusOne = n => n+1
    const squaresPlusOne = numbers => numbers.map(
      square
    ).map(
      plusOne
    )

    return (
      <button className="Button1" onClick={
        e => console.log('I\'m a button', c, redApples[0], squaresPlusOne([7,9]))
      }>Click Me!</button>
    );
  }
})

var Testing = React.createClass({
  render: function() {
    const statement = [
      {
          type: 'credit',
          amount: 500,
          from: 'location A'
      },
      {
          type: 'debit',
          amount: 8,
          from: 'location b'
      },
      {
          type: 'debit',
          amount: 90,
          from: 'location c'
      },
      {
          type: 'debit',
          amount: 10,
          from: 'location b'
      },
      {
          type: 'debit',
          amount: 5,
          from: 'location d'
      },
      {
          type: 'debit',
          amount: 10,
          from: 'location e'
      }
    ]

    // First ecample
    // const isDebit = transaction => transaction.type === 'debit'
    // const amount = transaction => transaction.amount
    // const sum = (a,b) => a+b
    //
    // const log = (value, name = 'default log name: ') => console.log(name, value) || value
    //
    // const totalSpent = log(statement.filter(
    //     isDebit
    // ).map(
    //     amount
    // )).reduce(
    //     sum
    // )

    // Second example
    const debitTransactions = statement => statement.filter(
        transaction => transaction.type === 'debit'
    )

    const creditTransactions = statement => statement.filter(
        transaction => transaction.type === 'credit'
    )

    const amount = statement => statement.map(
        transaction => transaction.amount
    )

    const summation = values => values.reduce(
        (previous, current) => previous + current
    )

    const totalAmount = (statement, filter, value, operation) => operation(
        value(
            filter(
                statement
            )
        )
    )

    console.log(totalAmount(
        statement,
        debitTransactions,
        amount,
        summation
    ))

    // Third example
    // const keyIsValue = (key, value) => element => element[key] === value
    // const debitTransactions = statement => statement.filter(keyIsValue('type', 'debit'))
    // const creditTransactions = statement => statement.filter(keyIsValue('type', 'credit'))
    //
    // const byKey = key => element => element[key]
    // const amount = statement => statement.map(byKey('amount'))
    //
    // const summation = (previous, current) => previous + current
    // const arraySummation = arr => arr.reduce(summation)
    //
    // const totalAmount = (statement, filter, value, operation) => operation(
    //     value(
    //         filter(
    //             statement
    //         )
    //     )
    // )
    //
    // console.log(totalAmount(
    //     statement,
    //     debitTransactions,
    //     amount,
    //     arraySummation
    // ))

    // Switch {totalAmount} out with totalSpent to view the results of the First example

    return (
      <div className="testing">
        {totalAmount}
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000}/>,
  document.getElementById('content')
);
