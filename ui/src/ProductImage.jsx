import React from 'react';

import graphQLFetch from './graphQLFetch.js';

export default class ProductImage extends React.Component {
  constructor() {
    super();
    this.state = { product: {} };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (prevId !== id) {
      this.loadData();
    }
  }

  async loadData() {
    const { match: { params: { id } } } = this.props;
    const query = `query product($id: Int!) {
      product (id: $id) {
        id imageUrl pname
      }
    }`;

    const data = await graphQLFetch(query, { id });
    if (data) {
      this.setState({ product: data.product });
    } else {
      this.setState({ product: {} });
    }
  }

  render() {
    const { product: { id, imageUrl, pname } } = this.state;
    return (
      <div>
        <h3>
          Product &nbsp;
          {id}
        </h3>
        <img src={`${imageUrl}`} alt={`${pname}`} />
      </div>
    );
  }
}
