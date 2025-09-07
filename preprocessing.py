# import os
# from dotenv import load_dotenv
# from src.helper import load_pdf_file, text_split, download_hugging_face_embeddings
# from langchain_pinecone import PineconeVectorStore
# from pinecone import Pinecone


# load_dotenv()
# PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
# index_name = "test"  # Your existing index

# doc_name = "Kharif Agro"



# # Download the fixed document (run once)
# document_url = "https://agritech.tnau.ac.in/pdf/AGRICULTURE.pdf"
# import requests, tempfile
# response = requests.get(document_url)
# with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
#     temp_file.write(response.content)
#     temp_filepath = temp_file.name

# # Process and embed (using your functions)
# embeddings = download_hugging_face_embeddings()
# extracted_data = load_pdf_file(temp_filepath)
# chunks = text_split(extracted_data, temp_filepath)  # Your semantic chunker

# for chunk in chunks:
#     chunk.metadata["doc_id"] = doc_name

# # Upsert to Pinecone (persistent)
# pc = Pinecone(api_key=PINECONE_API_KEY)
# docsearch = PineconeVectorStore.from_documents(
#     documents=chunks,
#     index_name=index_name,
#     embedding=embeddings,
# )

# # Clean up
# os.remove(temp_filepath)
# print(f"Stored chunks for document: {doc_name}")
# print("Embeddings pre-stored in Pinecone!")



import os
from dotenv import load_dotenv
from src.helper import load_pdf_file, text_split, download_hugging_face_embeddings
from langchain_pinecone import PineconeVectorStore
from langchain_community.vectorstores import Chroma
from pinecone import Pinecone
import requests
import tempfile

# Load environment variables
load_dotenv()
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
index_name = "test"

# Document info
doc_name = "op"
document_url = "https://transdev.assam.gov.in/sites/default/files/swf_utility_folder/departments/pndd_medhassu_in_oid_2/menu/document/compendium_of_govt._of_india_schemes_programmes.pdf"

# Download PDF
response = requests.get(document_url)
with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
    temp_file.write(response.content)
    temp_filepath = temp_file.name

# Prepare embeddings
embeddings = download_hugging_face_embeddings()

# Extract and chunk text
extracted_data = load_pdf_file(temp_filepath)
chunks = text_split(extracted_data, temp_filepath)

# Add doc_id metadata to all chunks
for chunk in chunks:
    chunk.metadata["doc_id"] = doc_name

# Store in Pinecone
pc = Pinecone(api_key=PINECONE_API_KEY)
PineconeVectorStore.from_documents(
    documents=chunks,
    index_name=index_name,
    embedding=embeddings,
)

# Store in Chroma with same doc_id
chroma_dir = "./chroma_storage"
chroma_store = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory=chroma_dir
)
chroma_store.persist()

# Clean up
os.remove(temp_filepath)
print(f"✅ Stored '{doc_name}' in both Pinecone & Chroma with doc_id metadata!")
