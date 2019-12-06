{
  "targets": [
    {
      "target_name": "read",
      "sources": [ "read.cc" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}
