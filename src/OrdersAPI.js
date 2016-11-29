import _ from 'underscore';

const GeoUtils = require('../GeoUtils');
const Auth = require('./Auth');
const AppConfig = require('./AppConfig');
const ResourcesAPI = require('./ResourcesAPI');

class OrdersAPI {
  static getOrders() {
    return fetch(AppConfig.API_BASEURL + '/orders')
      .then((response) => {
        return response.json();
      });
  }
  static getOrderById(id) {
    return Auth.getUser()
      .then((user) => {
        var headers = new Headers();
        headers.append("Authorization", "Bearer " + user.token);
        var request = new Request(AppConfig.API_BASEURL + '/api/orders/' + id, {
          method: 'GET',
          headers: headers,
        });
        return fetch(request)
          .then((response) => {
            return response.json();
          })
          .then((order) => {
            return new Promise((resolve, reject) => {
              resolve(order);
            });
          })
          .catch((err) => {
            console.log('ERROR', err);
          });
    });
  }
  static createOrder(cart) {
    return Auth.getUser().then((user) => {
      var headers = new Headers();
      headers.append("Authorization", "Bearer " + user.token);
      headers.append("Content-Type", "application/json");
      var request = new Request(AppConfig.API_BASEURL + '/api/orders', {
        method: 'POST',
        body: JSON.stringify(cart.toJSON()),
        headers: headers,
      });
      return fetch(request)
        .then((response) => {
          return response.json();
        })
        .catch((err) => {
          console.log('ERROR', err);
        });
    });
  }
  static acceptOrder(order) {
    return Auth.getUser().then((user) => {
      var headers = new Headers();
      headers.append("Authorization", "Bearer " + user.token);
      headers.append("Content-Type", "application/json");
      var request = new Request(AppConfig.API_BASEURL + order['@id'] + '/accept', {
        method: 'PUT',
        body: JSON.stringify({status: "ACCEPTED"}),
        headers: headers,
      });
      return fetch(request)
        .then((response) => {
          return response.json();
        })
        .catch((err) => {
          console.log('ERROR', err);
        });
    });
  }
  static pickOrder(order) {
    return ResourcesAPI
      .createAuthorizedRequest('PUT', order['@id'] + '/pick', {status: "PICKED"})
      .then((request) => {
        return fetch(request)
          .then((response) => {
            return response.json();
          })
          .catch((err) => {
            console.log('ERROR', err);
          });
      });
  }
  static deliverOrder(order) {
    return ResourcesAPI
      .createAuthorizedRequest('PUT', order['@id'] + '/deliver', {status: "DELIVERED"})
      .then((request) => {
        return fetch(request)
          .then((response) => {
            return response.json();
          })
          .catch((err) => {
            console.log('ERROR', err);
          });
      });
  }
}

module.exports = OrdersAPI;