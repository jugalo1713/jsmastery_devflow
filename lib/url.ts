import { Key } from "lucide-react";
import qs from "query-string";

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
  value: string;
}

export const formUrlQuery = ({
  params,
  key: keyToRemove,
  value,
}: UrlQueryParams) => {
  const queryString = qs.parse(params);
  queryString[keyToRemove] = value;
  return qs.stringifyUrl({
    url: window.location.pathname,
    query: queryString,
  });
};
export const removeKeysFromUrlQuery = ({
  params,
  keysToRemove,
  value,
}: RemoveUrlQueryParams) => {
  const queryString = qs.parse(params);
  keysToRemove.forEach((key) => {
    delete queryString[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: queryString,
    },
    { skipNull: true }
  );
};
