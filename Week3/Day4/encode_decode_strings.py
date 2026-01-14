# encode decode strings
from typing import List

def encode(self, strs: List[str]) -> str:
        encoded = ""
        for s in strs:
            encoded += str(len(s))+"#"+s
        return encoded

def decode(self, s: str) -> List[str]:
        result = []
        i = 0

        while i<len(s):
            j = i
            while s[j] !='#':
                j+=1
            length = int(s[i:j])
            word = s[j+1 : j+1+length]

            result.append(word)
            i = j+1+length
        return result

if __name__ == "__main__":
    strs = ["hello", "world", "this", "is", "a", "test"]
    encoded_str = encode(None, strs)
    print("Encoded:", encoded_str)
    decoded_strs = decode(None, encoded_str)
    print("Decoded:", decoded_strs)
