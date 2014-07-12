package ch.vorburger.mui.routes;

import java.io.IOException;
import java.net.URL;

import javax.inject.Inject;

import mui.MuiPackage;

import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.eson.resource.EFactoryResource;
import org.eclipse.xtext.junit4.InjectWith;
import org.eclipse.xtext.junit4.XtextRunner;
import org.eclipse.xtext.junit4.util.ParseHelper;
import org.eclipse.xtext.junit4.validation.ValidationTestHelper;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import com.google.common.base.Charsets;
import com.google.common.io.Resources;
//vorburger@github.com/vorburger/MUI.js.git
import mui.States;

@RunWith(XtextRunner.class)
@InjectWith(EFactoryInjectorProvider.class)
public class RoutesGeneratorIntegrationTest {

	// TODO make an EIO like combined ParseHelper & ValidationTestHelper which also validates.. contribute to Xtext? in ds.open, not MUI?
	@Inject ParseHelper<EObject> parseHelper;
	@Inject ValidationTestHelper validationTestHelper;
	
	@Test public void testGeneratingRoutesJS() throws Exception {
		MuiPackage.eINSTANCE.toString(); // TODO auto register.. how? META-INF/... service like auto discovery
		CharSequence eson = getResourceAsString("router-states.eson");
		EObject root = parseHelper.parse(eson);
		validationTestHelper.assertNoErrors(root);
		States states = EFactoryResource.getEFactoryEObject(root.eResource(), States.class);
		RoutesGenerator routesGenerator = new RoutesGenerator(); // @Inject ?
		CharSequence genJS = routesGenerator.js(states);
		CharSequence expectedJS = getResourceAsString("routes.js");
		assertEquals(expectedJS, genJS);
		// TODO assert its valid JS by running it through a JS parser
	}
	
	// TODO move following two helper up somewhere handy...
	
	/**
	 * @see https://github.com/junit-team/junit/pull/949/
	 */
	protected void assertEquals(CharSequence expected, CharSequence actual) {
		// TODO trim() each line..
		Assert.assertEquals(expected.toString().trim(), actual.toString().trim());
	}
	
	private String getResourceAsString(String resourceName) throws IOException {
		URL url = Resources.getResource(RoutesGeneratorIntegrationTest.class, resourceName);
		return Resources.toString(url, Charsets.UTF_8);
	}
}
