package ch.vorburger.mui.routes

import mui.AbstractState
import mui.States

class RoutesGenerator /* ? implements IGenerator ? */ {

	// TODO module name should not be hard-coded..
	// TODO header stuff should be shared out somewhere else re-usable
	// TODO ultimately, this shouldn't be in project mui.xcore, but fine grained modularized in a a routing support add-on plug-in 
	def js(States states) '''
		'use strict';

		/*global angular:true*/
		angular.module('mui.jsAngularAddressbookApp') // NOTE: Do *NOT* ,[...]) here!! http://stackoverflow.com/questions/16771812/angularjs-seed-putting-javascript-into-separate-files-app-js-controllers-js
		  .config(function ($stateProvider, $urlRouterProvider) {
		
			// For any unmatched url, or when there is no when there is no route, send to default state URL
		    $urlRouterProvider.otherwise(«states.start.urlOrDefault»);
		    $urlRouterProvider.when('', '/main/home');
		
		    $stateProvider
		    «FOR state : states.states» // TODO all CONTAINED states!!
		      .state('«state.fqn»', { url: '«state.urlOrDefault»' } )
		    «ENDFOR»
		});
	'''
	// TODO views
	// TODO support params
	// TODO support title, with type guard switch if State
	// TODO support "aliases" $urlRouterProvider.when('/main/kontakte', '/main/contacts');
	
	def urlOrDefault(AbstractState state) {
		if (state.urlSeg != null) state.urlSeg else state.name  
	}

	def fqn(AbstractState state) {
		var name = new StringBuilder(state.name)
		var parent = state;
		while (parent.eContainer instanceof AbstractState) {
			parent = parent.eContainer as AbstractState
			name.insert(0, '.')			
			name.insert(0, parent.name)
		}
		return name
	}
}