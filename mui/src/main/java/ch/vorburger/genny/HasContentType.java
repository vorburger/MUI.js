package ch.vorburger.genny;

public interface HasContentType {

	/**
	 * The MIME Type (AKA Content Type) of the stream produced.
	 * @return RFC 2046 compliant type
	 */
	// TODO Better more strongly typed return type than String?
	String getContentType();

}
