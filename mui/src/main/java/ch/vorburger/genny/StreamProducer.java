package ch.vorburger.genny;

import java.io.InputStream;

public interface StreamProducer extends HasContentType {

	/**
	 * Binary Output of this Producer.
	 * 
	 * @return InputStream from which a client can read the Output of this Producer from.
	 */
	InputStream getBinaryOutput();
	
}
