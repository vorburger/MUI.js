package ch.vorburger.genny;

import java.io.Reader;
import java.io.StringReader;

public class TextProducerStringBufferBasedImpl extends TextProducerAdapter implements TextProducer {

	protected final StringBuilder sb;
	
	public TextProducerStringBufferBasedImpl() {
		sb = new StringBuilder();
	}

	public TextProducerStringBufferBasedImpl(CharSequence cs) {
		sb = new StringBuilder(cs);
	}

	@Override
	public final Reader getTextOutput() {
		return new StringReader(asString());
	}

	@Override
	public String asString() {
		return sb.toString();
	}
}
