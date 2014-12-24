package ch.vorburger.genny;

import java.io.IOException;
import java.io.Reader;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.io.CharStreams;

public interface TextProducer extends HasContentType {
	static final Logger LOG = LoggerFactory.getLogger(TextProducer.class);

	/**
	 * Textual Output of this Producer.
	 * 
	 * @return Reader from which a client can read the Output of this Producer from.
	 */
	Reader getTextOutput();
	
	default String asString() {
		try {
			return CharStreams.toString(getTextOutput());
		} catch (IOException e) {
			String msg = "IOException from getTextOutput(): " + e.getMessage();
			LOG.warn(msg, e);
			return msg;
		}
	}
}
