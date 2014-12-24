package ch.vorburger.genny;

import java.io.Reader;
import java.io.StringReader;

public class TextProducerStringBuilderBasedImpl implements TextProducer {

	private final String contentType;
	protected final StringBuilder sb;
	
	public TextProducerStringBuilderBasedImpl(String contentType) {
		this("", contentType);
	}

	public TextProducerStringBuilderBasedImpl(CharSequence cs, String contentType) {
		sb = new StringBuilder(cs);
		this.contentType = contentType;
	}

	@Override
	public String getContentType() {
		return contentType;
	}

	@Override
	public final Reader getTextOutput() {
		return new StringReader(asString());
	}

	@Override
	public String asString() {
		return sb.toString();
	}

	@Override
	public final String toString() {
		String objectToString = getClass().getName() + "@" + Integer.toHexString(hashCode()); // super.toString()
		StringBuilder sb = new StringBuilder(objectToString);
		sb.append(asString());
		return objectToString.toString();
	}

}
