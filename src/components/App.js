import React, { Component } from 'react';

import Header from './Header';
import WelcomeView from './WelcomeView';
import liquor_storeView from './liquor_storeView';
import LoadingView from './LoadingView';
import ErrorView from './ErrorView';

import getRandomItemFromArray from '../utils/getRandomItemFromArray';
import requestCurrentLocation from '../utils/requestCurrentLocation';
import {
  getliquor_storeId,
  parseliquor_storeData,
  parseDistanceData
} from '../api/googleAPIResponseParser';
import {
  requestNearbyliquor_store,
  requestliquor_storeDetails,
  requestliquor_storeDistance,
} from '../api/googleAPIRequester';
import { ERRORS } from '../constants';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isGenericError: false,
      isLocationError: false,
      isGettingLocation: false,
      isFetchingData: false,
      areNoResults: false,
      liquor_store: null
    };

    this.checkIfCurrentliquor_store = this.checkIfCurrentliquor_store.bind(this);
    this.requestRandomliquor_store = this.requestRandomliquor_store.bind(this);
    this.getRandomliquor_storeNearby = this.getRandomliquor_storeNearby.bind(this);
  }

  setliquor_storeData(liquor_store, distance) {
    this.setState({
      liquor_store: {
        ...parseliquor_storeData(liquor_store),
        ...parseDistanceData(distance)
      },
      isFetchingData: false
    });
  }

  checkIfCurrentliquor_store(liquor_store) {
    const { liquor_store: currentliquor_store } = this.state;

    const isCurrentliquor_store = currentliquor_store &&
      getliquor_storeId(liquor_store) === currentliquor_store.id;

    if (isCurrentliquor_store) return Promise.reject(ERRORS.SEARCH_AGAIN);
    return liquor_store;
  }

  requestRandomliquor_store(coordinates) {
    this.setState({
      isGettingLocation: false,
      isFetchingData: true,
      areNoResults: false
    });

    requestNearbyliquor_store(coordinates)
      .then(getRandomItemFromArray)
      .then(this.checkIfCurrentliquor_store)
      .then(requestliquor_storeDetails)
      .then(liquor_store => Promise.all([
        liquor_store, requestCurrentLocation.Name(liquor_store, coordinates)
      ]))
      .then(data => this.setPlace.Field.NAME(...data))
      .catch(error => {
        if (error === ERRORS.SEARCH_AGAIN) {
          return this.getRandomliquor_storeNearby();
        }

        if (error === ERRORS.NO_RESULTS) {
          return this.setState({
            isFetchingData: false,
            areNoResults: true
          })
        }

        this.setState({
          isFetchingData: false,
          isGenericError: true
        });
      });
  }

  getRandomliquor_storeNearby() {
    this.setState({
      isGenericError: false,
      isLocationError: false,
      isGettingLocation: true
    });

    requestCurrentLocation()
      .then(this.requestRandomliquor_store)
      .catch(() => {
        this.setState({
          isGettingLocation: false,
          isLocationError: true
        })
      });
  }

  getCurrentView() {
    const {
      isGenericError, isLocationError, areNoResults, isFetchingData, isGettingLocation, liquor_store
    } = this.state;

    if (isGenericError) {
      return (
        <ErrorView
          iconName="error"
          title="Unknown error"
          text="Something went wrong, please try again"
        />
      );
    }

    if (isLocationError) {
      return (
        <ErrorView
          iconName="location_off"
          title="No location"
          text="We couldn't get your position, please make sure you turned location on"
        />
      );
    }

    if (isGettingLocation) {
      return (
        <LoadingView
          iconName="location_on"
        />
      );
    }

    if (areNoResults) {
      return (
        <ErrorView
          iconName="explore"
          title="No results"
          text="Sorry, there are no Parks nearby"
        />
      );
    }

    if (isFetchingData) {
      return (
        <LoadingView
          iconName="search"
        />
      );
    }

    if (liquor_store) {
      return (
        <liquor_storeView
          {...liquor_store}
        />
      );
    }

    return (
      <WelcomeView
        handleStart={this.getRandomliquor_storeNearby}
      />
    );
  }

  render() {
    const {
      liquor_store, isFetchingData, isGettingLocation, isLocationError, areNoResults
    } = this.state;

    return (
      <div
        className="app"
      >
        <Header
          showRefreshButton={
            (!!liquor_store && !isFetchingData && !isGettingLocation) ||
            areNoResults || isLocationError
          }
          handleRefresh={this.getRandomliquor_storeNearby}
        />

        {this.getCurrentView()}
      </div>
    );
  }
}

export default App;
