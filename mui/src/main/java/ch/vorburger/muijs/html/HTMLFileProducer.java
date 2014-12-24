package ch.vorburger.muijs.html;

import ch.vorburger.genny.FileProducer;

public class HTMLFileProducer extends HTMLFragmentProducer implements FileProducer {

	private String fileName;

	@Override
	public String getFileName() {
		if (fileName == null)
			throw new IllegalStateException("File name has not (yet?) been set");
		return fileName;
	}

	public void setFileName(String fileName) {
		if (fileName != null)
			throw new IllegalStateException("File name has already been set");
		this.fileName = fileName;
	}
	
}
