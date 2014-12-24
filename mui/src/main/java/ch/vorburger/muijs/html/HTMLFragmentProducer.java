package ch.vorburger.muijs.html;

import ch.vorburger.genny.TextProducerAdapter;

public abstract class HTMLFragmentProducer extends TextProducerAdapter {

	public HTMLFragmentProducer() {
		setContentType("text/html");
	}
	
}
