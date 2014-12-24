package ch.vorburger.genny;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;

import org.apache.commons.io.input.ReaderInputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.io.CharStreams;

public abstract class TextProducerAdapter implements TextProducer {
	private static final Logger LOG = LoggerFactory.getLogger(TextProducerAdapter.class);
	
	private String contentType;
	private Charset charset;

	@Override
	public final InputStream getBinaryOutput() {
		return new ReaderInputStream(getTextOutput(), getCharset());
	}

	@Override
	public final String getContentType() throws IllegalStateException {
		if (contentType == null)
			throw new IllegalStateException("ContentType has not (yet?) been set");
		return contentType;
	}

	// Intentionally protected - the implementation will choose the desired content type
	protected final void setContentType(String contentType) throws IllegalStateException {
		if (contentType != null)
			throw new IllegalStateException("ContentType has already been set");
		this.contentType = contentType;
	}
	
	@Override
	public final Charset getCharset() throws IllegalStateException {
		if (charset == null)
			throw new IllegalStateException("Charset has not (yet?) been set");
		return charset;
	}

	// Intentionally public - the call will choose the requested charset
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
