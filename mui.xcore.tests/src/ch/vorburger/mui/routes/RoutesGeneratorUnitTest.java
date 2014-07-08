package ch.vorburger.mui.routes;

import static org.junit.Assert.assertEquals;
import mui.MuiFactory;
import mui.State;

import org.junit.Test;

public class RoutesGeneratorUnitTest {

	@Test
	public void testGetUrlOrDefault() {
		State state = MuiFactory.eINSTANCE.createState();
		state.setName("name");
		assertEquals("name", new RoutesGenerator().urlOrNameAsDefault(state));
		state.setUrlSeg("urlFragment");
		assertEquals("urlFragment", new RoutesGenerator().urlOrNameAsDefault(state));
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
	
}
