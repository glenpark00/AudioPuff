json.extract! @song, :id
json.file_url url_for(@song.audio_file)