package ch.vorburger.genny;

import java.io.IOException;
import java.io.Reader;

import org.slf4j.LoggerFactory;

import com.google.common.io.CharStreams;

public interface TextProducer extends HasContentType {

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
			// Logger here instead of static final, because we don't want it public (implementing classes should have their own)
			LoggerFactory.getLogger(TextProducer.class).warn(msg, e);
			return msg;
		}
	}
}
