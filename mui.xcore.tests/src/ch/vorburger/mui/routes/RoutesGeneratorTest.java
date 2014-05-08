package ch.vorburger.mui.routes;

import static org.junit.Assert.*;
import mui.MuiFactory;
import mui.State;

import org.eclipse.xtext.junit4.XtextRunner;
import org.junit.Test;
import org.junit.runner.RunWith;

//@RunWith(XtextRunner.class)
// TODO @InjectWith(EsonInjectorProvider.class)
public class RoutesGeneratorTest {

	@Test
	public void testGetUrlOrDefault() {
		State state = MuiFactory.eINSTANCE.createState();
		state.setName("name");
		assertEquals("name", new RoutesGenerator().urlOrDefault(state));
		state.setUrlSeg("urlFragment");
		assertEquals("urlFragment", new RoutesGenerator().urlOrDefault(state));
	}

	@Test
	public void testGetFQN() {
		State childState = MuiFactory.eINSTANCE.createState();
		childState.setName("child");

		State parentState = MuiFactory.eINSTANCE.createState();
		parentState.setName("parent");
		parentState.getStates().add(childState);

		assertEquals("parent", new RoutesGenerator().fqn(parentState).toString());
		assertEquals("parent.child", new RoutesGenerator().fqn(childState).toString());
	}
	
	// TODO test parsing router-states.eson and assert it gen. routes.js
}
