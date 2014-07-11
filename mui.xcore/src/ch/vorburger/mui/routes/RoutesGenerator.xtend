package ch.vorburger.mui.routes

import mui.AbstractState
import mui.States
import com.google.common.base.Function
import mui.State
import org.eclipse.emf.ecore.EObject
import org.eclipse.emf.ecore.util.EcoreUtil
import org.eclipse.emf.common.util.TreeIterator
import java.util.Iterator

class RoutesGenerator /* ? implements JS(!)IGenerator ? */ {

	// TODO module name should not be hard-coded..
	// TODO header stuff should be shared out somewhere else re-usable
	// TODO ultimately, this shouldn't be in project mui.xcore, but fine grained modularized in a a routing support add-on plug-in 
	
	TreeIterator<Object> iterator
	
	def js(States states) '''
		'use strict';

		/*global angular:true*/
		angular.module('mui.jsAngularAddressbookApp') // NOTE: Do *NOT* ,[...]) here!! http://stackoverflow.com/questions/16771812/angularjs-seed-putting-javascript-into-separate-files-app-js-controllers-js
		  .config(function ($stateProvider, $urlRouterProvider) {
		
		    $urlRouterProvider.otherwise('«states.start.fqu»');
		    $urlRouterProvider.when('', '«states.start.fqu»');
		
		    $stateProvider« /* nota bene: better to NOT (ever) use just url: '/' ! */ »
		    «FOR state : states.allContained(AbstractState)»
		      .state('«state.fqn»', { url: '«state.fqu»', «IF state.isAbstract »abstract: true, «ELSE»title: '«(state as State).title»', «ENDIF»views: { «state.genViews» } } )
		    «ENDFOR»
		});
	'''
	
	def genViews(AbstractState state) '''
	'''
	
	def boolean isAbstract(AbstractState state) {
		return !(state instanceof State)
	}
	
	// TODO views
	// TODO support params
	// TODO support title, with type guard switch if State
	// TODO support "aliases" $urlRouterProvider.when('/main/kontakte', '/main/contacts');
	
	def urlOrNameAsDefault(AbstractState state) {
		if (state.urlSeg != null) state.urlSeg else state.name  
	}

	def fqu(AbstractState state) {
		'/' + fqX(state, "/", [ stateX | stateX.urlOrNameAsDefault ] )
	}

	def fqn(AbstractState state) {
		fqX(state, ".", [ stateX | stateX.name ] )
	}
	
	// ---
	// TODO Following generic helpers should be moved out
	
	// TODO make this generic <T>	
	def fqX(AbstractState state, String delimiter, Function<AbstractState, String> x) {
		var xString = new StringBuilder(x.apply(state))
		var parent = state;
		while ((parent = parent.parentAbstractState) != null) {
			xString.insert(0, delimiter)			
			xString.insert(0, x.apply(parent))
		}
		return xString
	}
	
	// TODO Does this already exist anywhere else like this (using Iterable streaming, not List) ?
	def <T extends EObject> Iterable<T> allContained(EObject root, Class<T> type) {
		// TODO TDD if (type.isAssignableFrom(root.getClass())) - union
		
		// TODO vs. EcoreUtil2.eAll(EObject) vs. root.eAllContents() - what's the difference??
		val iterator = EcoreUtil.getAllProperContents(root, true)
		val iterable = toIterable(iterator)
		return iterable.filter[ type.isAssignableFrom(it.getClass) ]
	}

	def <T> Iterable<T> toIterable(Iterator<T> iterator) {
		return new Iterable<T>() {
			override iterator() {
				iterator
			}
		}
	}

}