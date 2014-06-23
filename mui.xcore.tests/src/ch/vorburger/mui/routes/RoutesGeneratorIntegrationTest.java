package ch.vorburger.mui.routes;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URL;

import javax.inject.Inject;

import mui.MuiPackage;
import mui.States;

import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.eson.resource.EFactoryResource;
import org.eclipse.xtext.junit4.InjectWith;
import org.eclipse.xtext.junit4.XtextRunner;
import org.eclipse.xtext.junit4.util.ParseHelper;
import org.eclipse.xtext.junit4.validation.ValidationTestHelper;
import org.junit.Test;
import org.junit.runner.RunWith;

import com.google.common.base.Charsets;
import com.google.common.io.Resources;

@RunWith(XtextRunner.class)
@InjectWith(EFactoryInjectorProvider.class)
public class RoutesGeneratorIntegrationTest {

	// TODO make an EIO like combined ParseHelper & ValidationTestHelper which also validates.. contribute to Xtext? in ds.open, not MUI?
	@Inject ParseHelper<EObject> parseHelper;
	@Inject ValidationTestHelper validationTestHelper;
	
	@Test public void testGeneratingRoutesJS() throws Exception {
		MuiPackage.eINSTANCE.toString(); // @Before
		CharSequence eson = getResourceAsString("router-states.eson");
		EObject root = parseHelper.parse(eson );
		validationTestHelper.assertNoErrors(root);
		States states = EFactoryResource.getEFactoryEObject(root.eResource(), States.class);
		RoutesGenerator routesGenerator = new RoutesGenerator(); // @Inject ?
		CharSequence genJS = routesGenerator.js(states);
		CharSequence expectedJS = getResourceAsString("routes.js");
		assertEquals(expectedJS, genJS);
	}
	
	// TODO move somewhere handy...
	private String getResourceAsString(String resourceName) throws IOException {
		URL url = getClass().getResource(resourceName); // NOT Resources.getResource(resourceName); because that does not do java.lang.Class.resolveName(String) ..
		return Resources.toString(url, Charsets.UTF_8);
	}
}
