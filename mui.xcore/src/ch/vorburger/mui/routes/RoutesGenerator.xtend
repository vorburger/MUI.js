package ch.vorburger.mui.routes

import mui.States
import mui.State

class RoutesGenerator /* ? implements IGenerator ? */ {

	// TODO module name should not be hard-coded..
	// TODO header stuff should be shared out somewhere else re-usable
	// TODO ultimately, this shouldn't be in project mui.xcore, but fine grained modularized in a a routing support add-on plug-in 
	def js(States states) '''
		'use strict';

		/*global angular:true*/
		angular.module('mui.jsAngularAddressbookApp') // NOTE: Do *NOT* ,[...]) here!! http://stackoverflow.com/questions/16771812/angularjs-seed-putting-javascript-into-separate-files-app-js-controllers-js
		  .config(function ($stateProvider, $urlRouterProvider) {
		
		$urlRouterProvider.otherwise(«states.start.getURLOrDefault»);
		$urlRouterProvider.when('', '/main/home');
		
		  $stateProvider
		}
	'''
	
	def getURLOrDefault(State state) {
		if (state.urlSeg != null) state.urlSeg else state.name  
	}
	
}