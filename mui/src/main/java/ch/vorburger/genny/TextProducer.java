package ch.vorburger.genny;

import java.io.IOException;
import java.io.Reader;
import java.nio.charset.Charset;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.io.CharStreams;

public interface TextProducer extends StreamProducer {
	static final Logger LOG = LoggerFactory.getLogger(TextProducer.class);

	// How about not making TextProducer extend StreamProducer, but having an Adapter
	
	/**
	 * Textual Output of this Producer.
	 * 
	 * @return Reader from which a client can read the Output of this Producer from.
	 */
	Reader getTextOutput();
	
	/**
	 * Charset (AKA Encoding).
	 * Useful if it's used as a StreamProducer with getBinaryOutput();
	 * if it's just used as a TextProducer then the encoding (CharSet) is not directly relevant.
	 * 
	 * @return Character Set of this producer
	 */
	Charset getCharset();
	
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
