package ch.vorburger.mui.routes;

import static org.junit.Assert.*;
import mui.MuiFactory;
import mui.State;

import org.junit.Test;

public class RoutesGeneratorTest {

	@Test
	public void testGetUrlOrDefault() {
		State state = MuiFactory.eINSTANCE.createState();
		state.setName("name");
		assertEquals("name", new RoutesGenerator().getURLOrDefault(state));
		state.setUrlSeg("urlFragment");
		assertEquals("urlFragment", new RoutesGenerator().getURLOrDefault(state));
	}

}
