import { ChangeEvent } from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";

import Loader from "src/components/Loader";
import SearchInput from "src/pages/Articles/components/SearchInput";
import ArticleActions from "src/pages/Articles/components/ArticleActions";

import { useGetArticlesQuery } from "src/store/articles/articles.api";
import { useArticlesActions } from "src/store/articles/hooks/useArticlesActions";

import {
  getSkipArticles,
  getLimit,
  getTitle,
  getTotalPages,
  getSelectedArticle,
} from "src/store/articles/selectors";

const Articles = () => {
  const skip = useSelector(getSkipArticles);
  const limit = useSelector(getLimit);
  const totalPages = useSelector(getTotalPages);
  const title = useSelector(getTitle);
  const selectedArticle = useSelector(getSelectedArticle);
  const { data, isLoading } = useGetArticlesQuery(
    {
      limit,
      skip,
      title,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { switchPage, selectArticle } = useArticlesActions();

  const onChangeHandler = (
    event: ChangeEvent<unknown>,
    value: number
  ): void => {
    const calculateSkip = (value - 1) * limit;
    switchPage(calculateSkip);
  };

  return (
    <Grid
      container
      style={{ height: "100%" }}
      justifyContent="center"
      alignItems="center"
    >
      {isLoading && (
        <Grid>
          <Loader />
        </Grid>
      )}

      {!isLoading && (
        <>
          <Grid item xs={2} />
          <Grid
            item
            container
            xs={8}
            paddingY="20px"
            direction="column"
            alignItems="center"
            style={{ height: "100%" }}
          >
            <Grid item>
              <SearchInput />
            </Grid>

            <Grid item xs style={{ overflowY: "auto" }}>
              {!!data?.articles.length && (
                <List style={{ height: "100%" }}>
                  {data?.articles.map((article) => (
                    <Box
                      key={article.id}
                      display="flex"
                      flexDirection="column"
                      border="1px solid black"
                      borderRadius="8px"
                      margin="10px"
                      padding="5px"
                      onClick={() => selectArticle(article)}
                      bgcolor={
                        selectedArticle?.id === article.id ? "green" : "inherit"
                      }
                    >
                      <Box display="flex" alignItems="center">
                        <Box>{article.title}</Box>
                        <Link href={article.link} color="inherit" fontSize={18}>
                          <OpenInNewOutlinedIcon
                            style={{ height: "20px", width: "20px" }}
                          />
                        </Link>
                      </Box>

                      <Box textAlign="end">
                        published at: {article.publishDate}
                      </Box>
                    </Box>
                  ))}
                </List>
              )}

              {!data?.articles.length && (
                <Box fontSize={32} fontWeight={800} fontStyle="italic">
                  No content
                </Box>
              )}
            </Grid>

            <Grid item marginTop="15px">
              <Stack>
                <Pagination
                  count={totalPages}
                  color="primary"
                  page={skip / limit + 1}
                  onChange={onChangeHandler}
                />
              </Stack>
            </Grid>
          </Grid>
          <ArticleActions />
        </>
      )}
    </Grid>
  );
};

export default Articles;
