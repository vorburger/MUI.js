package ch.vorburger.genny;

import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.nio.charset.Charset;

import org.apache.commons.io.input.ReaderInputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.io.CharStreams;

public class TextAsStreamProducerAdapter implements StreamProducer  {
	private static final Logger LOG = LoggerFactory.getLogger(TextAsStreamProducerAdapter.class);
	
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
	
	@Override
	public final String toString() {
		String objectToString = getClass().getName() + "@" + Integer.toHexString(hashCode()); // super.toString()
		StringBuilder sb = new StringBuilder(objectToString);
		try {
			CharStreams.copy(getTextOutput(), sb);
		} catch (IOException e) {
			String msg = "IOException from getTextOutput() or CharStreams.copy(): " + e.getMessage();
			LOG.warn(msg, e);
			sb.append(msg);
		}
		return objectToString.toString();
	}
	
}
