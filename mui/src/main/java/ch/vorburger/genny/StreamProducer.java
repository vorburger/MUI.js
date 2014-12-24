package ch.vorburger.genny;

import java.io.InputStream;

public interface StreamProducer {

	/**
	 * Binary Output of this Producer.
	 * 
	 * @return InputStream from which a client can read the Output of this Producer from.
	 */
	InputStream getBinaryOutput();
	
	/**
	 * The MIME Type (AKA Content Type) of the stream produced.
	 * @return RFC 2046 compliant type
	 */
	// TODO Better more strongly typed return type than String
	String getContentType();
}
