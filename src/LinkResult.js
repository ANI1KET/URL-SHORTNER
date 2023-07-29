import axios from "axios";
import { useEffect, useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard";

const LinkResult = ({ inputValue }) => {
  const [shortenLink1, setShortenLink1] = useState("");
  const [shortenLink2, setShortenLink2] = useState("");
  const [shortenLink3, setShortenLink3] = useState("");
  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);
  const [copied3, setCopied3] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    if (inputValue.length) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await axios(`https://api.shrtco.de/v2/shorten?url=${inputValue}`);
          setShortenLink1(res.data.result.full_short_link);
          setShortenLink2(res.data.result.full_short_link2);
          setShortenLink3(res.data.result.full_short_link3);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    setTimeout(() => {
      setCopied1(false);
      setCopied2(false);
      setCopied3(false);
    }, 300);
  }, [copied1, copied2, copied3]);

  if (loading) {
    return <p className="noData">Loading...</p>
  }
  if (error) {
    return <p className="noData">Something went wrong</p>
  }

  return (
    <>
      {shortenLink1 && (
        <div className="result">
          <p>{shortenLink1}</p>
          <CopyToClipboard
            text={shortenLink1}
            onCopy={() => setCopied1(true)}
          >
            <button className={copied1 ? "copied" : ""}>Copy to Clipboard</button>
          </CopyToClipboard>
        </div>
      )},
      {shortenLink2 && (
        <div className="result">
          <p>{shortenLink2}</p>
          <CopyToClipboard
            text={shortenLink2}
            onCopy={() => setCopied2(true)}
          >
            <button className={copied2 ? "copied" : ""}>Copy to Clipboard</button>
          </CopyToClipboard>
        </div>
      )},
      {shortenLink3 && (
        <div className="result">
          <p>{shortenLink3}</p>
          <CopyToClipboard
            text={shortenLink3}
            onCopy={() => setCopied3(true)}
          >
            <button className={copied3 ? "copied" : ""}>Copy to Clipboard</button>
          </CopyToClipboard>
        </div>
      )};
    </>
  )
}

export default LinkResult;