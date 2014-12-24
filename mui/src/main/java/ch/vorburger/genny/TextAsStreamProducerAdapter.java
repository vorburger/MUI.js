package ch.vorburger.genny;

import java.io.InputStream;
import java.io.Reader;
import java.nio.charset.Charset;

import org.apache.commons.io.input.ReaderInputStream;

public class TextAsStreamProducerAdapter implements StreamProducer  {
	
	private final TextProducer textProducer;
	
	private Charset charset;

	public TextAsStreamProducerAdapter(TextProducer textProducer) {
		super();
		this.textProducer = textProducer;
	}

	@Override
	public String getContentType() {
		return textProducer.getContentType();
	}

	protected Reader getTextOutput() {
		return textProducer.getTextOutput();
	}

	@Override
	public final InputStream getBinaryOutput() throws IllegalStateException {
		return new ReaderInputStream(getTextOutput(), getCharset());
	}

	public final Charset getCharset() throws IllegalStateException {
		if (charset == null)
			throw new IllegalStateException("Charset has not (yet?) been set");
		return charset;
	}

	// Intentionally public - the caller will have to choose the requested CharSet
	public final void setCharset(Charset charset) throws IllegalStateException {
		if (charset != null)
			throw new IllegalStateException("Charset has already been set");
		this.charset = charset;
	}
	
}
